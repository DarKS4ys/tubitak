// Import necessary libraries
import { exec } from 'child_process';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import os from 'os';

const util = require('util');
const execAsync = util.promisify(exec);

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
async function convertAudioToText(audioData: any) {
  try {
    const mp3AudioData = await convertAudioToMp3(audioData);

    if (!mp3AudioData) {
      throw new Error('Failed to convert audio to MP3.');
    }

    const outputPath = `${os.tmpdir()}/output.mp3`;
    fs.writeFileSync(outputPath, mp3AudioData);
    
    const response = await openai.audio.transcriptions.create({
      file: fs.createReadStream(outputPath),
      model: 'whisper-1',
      language: "tr"
    });
    fs.unlinkSync(outputPath);
    const transcribedText = response.text
  
/*      console.log(transcribedText); */
     return transcribedText;
  } catch (err) {
    console.error(err);
  }
}

/* console.log(os.tmpdir()) */

async function convertAudioToMp3(audioData: any) {
  try {
    // Write the audio data to a file
    const inputPath = `${os.tmpdir()}/input.webm`;
    fs.writeFileSync(inputPath, audioData);
  
    // Convert the audio to MP3 using ffmpeg
    const outputPath = `${os.tmpdir()}/output.mp3`;
    await execAsync(`ffmpeg -i ${inputPath} ${outputPath}`);
    // Read the converted audio data

    const mp3AudioData = fs.readFileSync(outputPath);
    // Delete the temporary files
    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);

    return mp3AudioData;
  } catch (error) {
    console.log(error);
  }
}
