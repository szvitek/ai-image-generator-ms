import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';
import { generateSASToken } from '../../lib/generateSASToken';
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';

const accountName = process.env.accountName;
const accountKey = process.env.accountKey;
const containerName = 'images';

const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey
);

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

export async function handler(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const containerClient = blobServiceClient.getContainerClient(containerName);

  const imageUrls = [];
  const sasToken = await generateSASToken();

  for await (const blob of containerClient.listBlobsFlat()) {
    const imageUrl = `${blob.name}?${sasToken}`
    const url = `https://${accountName}.blob.core.windows.net/images/${imageUrl}`
    imageUrls.push({ url, name: blob.name })
  }

  const soretdImageUrls = imageUrls.sort((a, b) => {
    const aName = a.name.split('_').pop().toString().split('.').shift();
    const bName = b.name.split('_').pop().toString().split('.').shift();

    return bName - aName;
  })

  return {
    jsonBody: soretdImageUrls
  };
}

app.http('getImages', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler,
});
