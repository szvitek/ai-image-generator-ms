import { azure_base_url } from '@/lib/helpers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const res = await fetch(`${azure_base_url}/api/getImages`);

  const blob = await res.blob();
  const textData = await blob.text();

  const data = JSON.parse(textData);

  return new NextResponse(JSON.stringify(data), { status: 200 });
}
