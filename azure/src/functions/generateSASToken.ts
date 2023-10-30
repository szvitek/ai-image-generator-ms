import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';

import {generateSASToken} from '../../lib/generateSASToken';

export async function handler(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);
  const sasToken = await generateSASToken()

  return { body: sasToken };
}

app.http('generateSASToken', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler,
});
