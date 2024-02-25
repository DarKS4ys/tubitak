import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, res: NextResponse) {
    const body = await request.json();
    let { textInput } = body;
    let voice_id = 'Th8LQHbIXmksfr3mTo9v';

    // q6w6KZK7mGEZ1Rx02UzL
    // I6zCmbDokuE7EmkTMaKU
  
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`;
    const headers: Record<string, string> = {
      Accept: 'audio/mpeg',
      'Content-Type': 'application/json',
    };
    
    if (process.env.ELEVENLABS_API_KEY) {
      headers['xi-api-key'] = process.env.ELEVENLABS_API_KEY;
    } else {
      throw new Error('ELEVENLABS_API_KEY environment variable is not set.');
    }
  
    const reqBody = JSON.stringify({
      text: textInput,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5,
      },
    });
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: reqBody,
      });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return new Response(buffer);
    } catch (error: any) {
      console.log(error)
      return new Response(JSON.stringify({ error: error.message }));
    }
  }
  