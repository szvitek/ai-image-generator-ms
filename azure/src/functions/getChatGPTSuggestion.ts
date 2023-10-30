import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';

import OpenAI from 'openai';
import openai from '../../lib/openai';

export async function getChatGPTSuggestion(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const prompt =
    'Write a random text prompt for DALL-E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white etc. Do not wrap the answer in quotes.';
  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
    max_tokens: 100,
    temperature: 0.8,
  };
  context.log(`prompt "${prompt}, params ${params}"`);
  const chatCompletion = await openai.chat.completions.create(params);

  return { body: chatCompletion.choices[0].message.content };
}

app.http('getChatGPTSuggestion', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: getChatGPTSuggestion,
});
