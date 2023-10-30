import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt } = await request.json();


  const res = await fetch('http://localhost:7071/api/generateImage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt })
  });
  const textData = await res.text();

  return new NextResponse(JSON.stringify(textData));
}
