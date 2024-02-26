// Import necessary libraries
import { backendClient } from '@/lib/storage-server';
/* import { exec } from 'child_process'; */
import { NextRequest, NextResponse } from 'next/server';
import {blobToFile} from "@/lib/utils";
import path from "node:path";
import * as fs from "fs";

/* const execAsync = util.promisify(exec); */
const OpenAI = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);
export async function POST(request: NextRequest) {

  const req = await request.json();
  // Extract the audio data from the request body
  const base64Audio = req.audio;
  // Convert the Base64 audio data back to a Buffer
  const audio = Buffer.from(base64Audio, 'base64');
  try {
    // Convert the audio data to text
    const text = await convertAudioToText(audio);
    // Return the transcribed text in the response
    return NextResponse.json({ result: text }, { status: 200 });
  } catch (error: any) {
    // Handle any errors that occur during the request
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return NextResponse.json({ error: error.response.data }, { status: 500 });
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return NextResponse.json(
        { error: 'An error occurred during your request.' },
        { status: 500 }
      );
    }
  }
}
/*  console.log(os.tmpdir()) */

/* async function convertAudioToMp3(audioData: any) {
  try {
    // Write the audio data to a file
    const webmFile = await backendClient.publicFiles.upload({
      content: {
        blob: new Blob([audioData], { type: 'audio/webm' }),
        extension: 'webm',
      },
      options: {
        temporary: true,
      },
      ctx: {
        userId: '123',
        userRole: 'admin',
      },
      input: {
        type: 'post',
      },
    });

    // Convert the audio to MP3 using ffmpeg
    const outputPath = `${os.tmpdir()}/output.mp3`;
    await execAsync(`ffmpeg -i ${webmFile.url} ${outputPath}`);
    // Read the converted audio data

    const mp3AudioData = fs.readFileSync(outputPath);

    fs.unlinkSync(outputPath);

    return mp3AudioData;
  } catch (error) {
    console.log(error);
  }
}
 */
async function convertAudioToText(audioData: any) {

  try {
    const mp3AudioData = audioData

    if (!mp3AudioData) {
      throw new Error('Failed to convert audio to MP3.');
    }

    const res = await backendClient.publicFiles.upload({
      content: {
        blob: new Blob([mp3AudioData], { type: 'audio/mpeg' }),
        extension: 'mp3',
      },
      options: {
        temporary: true,
      },
      ctx: {
        userId: '123',
        userRole: 'admin',
      },
      input: {
        type: 'post',
      },
    })
    const mp3FileUrl = res.url;
    const fetchedResponse = await fetch(mp3FileUrl);
    const mp3Buffer = await fetchedResponse.arrayBuffer();
    const blob = new Blob([mp3Buffer], { type: 'audio/mpeg' });

    const file = new File([blob], 'audio.mp3', { type: 'audio/mpeg' });

    console.log(file)

/*     const outputPath = `${os.tmpdir()}/output.mp3`;
    fs.writeFileSync(outputPath, mp3AudioData); */

    const response = await openai.audio.transcriptions.create({
      file: file,
      model: 'whisper-1',
      language: 'tr',
    });
/*
    fs.unlinkSync(outputPath); */
    const transcribedText = response.text;

    return transcribedText;
  } catch (err) {
    console.error(err);
  }
}

/*
async function createFileFromBlob(blob: Blob, fileName: string) {
  // Convert Blob to ArrayBuffer
  const arrayBuffer = await blob.arrayBuffer();
  // Simulate creating a file from blob
  const fileContent = Buffer.from(arrayBuffer);

  const tempDir = path.join(process.cwd(), 'temp');

  // Ensure the temp directory exists
  await fsPromises.mkdir(tempDir, { recursive: true });

  const filePath = path.join(tempDir, fileName);
  fs.writeFileSync(filePath, fileContent);
  return filePath;
}*/
