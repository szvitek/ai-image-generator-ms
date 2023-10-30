import { azure_base_url } from '@/lib/helpers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const res = await fetch(`${azure_base_url}/api/getChatGPTSuggestion`);
  const textData = await res.text();

  return new NextResponse(JSON.stringify(textData.trim()), { status: 200 });
}
