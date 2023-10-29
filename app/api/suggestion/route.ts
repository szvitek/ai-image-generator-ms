import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // todo: connect to MS Azure endpoint
  const res = await fetch('http://localhost:7071/api/getChatGPTSuggestion');
  const textData = await res.text();

  return new NextResponse(JSON.stringify(textData.trim()), { status: 200 });
}
