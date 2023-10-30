import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';
import openai from '../../lib/openai';
import axios from 'axios';
import { generateSASToken } from '../../lib/generateSASToken';
import { BlobServiceClient } from '@azure/storage-blob';

const accountName = process.env.accountName;
const containerName = 'images';

export async function handler(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);
  const { prompt } = (await request.json()) as { prompt: string };

  const response = await openai.images.generate({
    prompt,
    n: 1,
    size: '1024x1024',
  });

  const image_url = response.data[0].url;
  const res = await axios.get(image_url, { responseType: 'arraybuffer' });
  const arraybuffer = res.data;

  const sasToken = await generateSASToken();
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net?${sasToken}`
  );

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const timestamp = new Date().getTime();
  const filename = `${prompt}_${timestamp}.png`;

  const blockBlobClient = containerClient.getBlockBlobClient(filename);

  try {
    await blockBlobClient.uploadData(arraybuffer);
    context.log('File uploaded successfully!');
  } catch (error) {
    context.error('Error uploading file: ', error.message);
  }

  return { body: 'Successfully Uploaded Image' };
}

app.http('generateImage', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler,
});
