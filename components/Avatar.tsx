'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BiMicrophone } from 'react-icons/bi';
import AvatarImage from '@/public/Avatar.png';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import clsx from 'clsx';
import { PiSparkleFill } from 'react-icons/pi';

export default function Avatar() {
  const [text, setText] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);

  const [AIResponse, setAIResponse] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [responseHeight, setResponseHeight] = useState(0);

  const [imageHover, setImageHover] = useState(false);

  const [width, setWidth] = useState('auto');

  const [audio, setAudio] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const breakpoints = {
    small: 500,
    medium: 768,
    large: 1600,
  };

  useEffect(() => {
    if (audio && audioRef.current) {
      audioRef.current.play();
    }
  }, [audio]);

  useLayoutEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= breakpoints.medium) {
        setWidth('220px');
      } else if (width <= breakpoints.large) {
        setWidth('350px');
      } else {
        setWidth('400px');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const lineHeight = 28;
    const fontSize = 20;
    const charactersPerLine = 22;
    const totalCharacters = AIResponse.length;

    let charactersPerLineAdjusted = charactersPerLine;
    if (width === '220px') {
      charactersPerLineAdjusted = 13;
    } else if (width === '350px') {
      charactersPerLineAdjusted = 18;
    } else {
      charactersPerLineAdjusted = 20.5;
    }

    const totalLines = Math.ceil(totalCharacters / charactersPerLineAdjusted);
    const pxHeight = totalLines * lineHeight + fontSize;
    setResponseHeight(pxHeight);

    console.log(pxHeight);
  }, [AIResponse, width]);

  const endpoint =
    'https://www.stack-inference.com/run_deployed_flow?flow_id=65da3b5d624145427a5468f1&org=c2e72dba-3092-4209-9615-8c7c9ea2c882';
  const apiKey = '0989f55b-3812-4674-bab6-bdd3be99a780';

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setIsSupported(false);
    }
  }, []);

  const handleSpeech = async (newtext: string) => {
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };

    const data = {
      'in-0': newtext,
    };

    try {
      setIsLoading(true);
      /*       const response = await axios.post(endpoint, data, { headers });
      const fullApiResponse = response.data['out-0']; */

      if (newtext) {
        const fullApiResponse = await fetch('/api/openai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: newtext }),
        });
        const responseData = await fullApiResponse.json();

        setAIResponse(responseData.response);

        const audioResponse = await fetch('/api/elevenlabs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ textInput: responseData.response }),
        });

        const arrayBuffer = await audioResponse.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
        const blobUrl = URL.createObjectURL(blob);
        setAudio(blobUrl);
      }
    } catch (error) {
      console.error('stack-error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    try {
      setAIResponse('');
      setIsLoading(false);
      setIsListening(false);

      if (!('webkitSpeechRecognition' in window) || !isSupported) {
        return;
      }

      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'tr-TR';
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setText(transcript);
        handleSpeech(transcript)
      };
      recognition.start();

      recognition.onstart = () => {
        setIsListening(true);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageHover = () => {
    setImageHover(true);
  };

  const handleImageHoverRevoke = () => {
    setImageHover(false);
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div
        onMouseEnter={handleImageHover}
        onMouseLeave={handleImageHoverRevoke}
        className="flex relative h-full w-full flex-col justify-center items-center"
      >
        <div className="inset-0 absolute -left-4 -z-10">
          <Image
            alt="Avatar Image"
            src={AvatarImage}
            fill
            priority
            quality={97}
            placeholder="blur"
            className="object-cover"
          />
        </div>
        {!isSupported && (
          <div className="absolute top-5 px-16 text-center">
            <p>Speech recognition is not supported in your browser.</p>
          </div>
        )}
        <div className="mt-[50svh]">
          <>
            <AnimatePresence>
              {(isListening || isLoading || AIResponse) && (
                <motion.div
                  initial={{ width: 'auto' }}
                  animate={
                    AIResponse
                      ? { width: width, height: `${responseHeight}px` }
                      : { width: width, height: 'auto' }
                  }
                  onMouseEnter={handleImageHover}
                  exit={{ width: 'auto' }}
                  className={clsx(
                    'flex items-center justify-center gap-4 rounded-xl bg-white/85 border border-white backdrop-blur-xl text-main',
                    isListening && 'animate-pulse'
                  )}
                >
                  <BiMicrophone size={64} className="ml-4" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, type: 'tween', duration: 0.8 }}
                    className="flex mr-4 items-center justify-center relative h-full w-full"
                  >
                    <h1
                      className={clsx(
                        'text-xl font-medium absolute inset-0',
                        !AIResponse ? '-top-3.5' : 'top-8'
                      )}
                    >
                      {AIResponse
                        ? AIResponse
                        : isLoading
                        ? 'Düşünüyor...'
                        : 'Konuşmaya başla...'}
                    </h1>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            <audio
              ref={audioRef}
              controls
              src={`${audio}`}
              className="w-full"
            />

            <div className="flex flex-col items-center gap-4 mt-4">
              <button
                className={clsx(
                  'w-24 h-24 bg-white/80 hover:bg-white transition active:scale-90 duration-300 backdrop-blur-lg text-main p-4 rounded-full',
                  (!isSupported || isListening) &&
                    'cursor-not-allowed opacity-50'
                )}
                onClick={startListening}
                disabled={!isSupported || isListening || isLoading}
              >
                {!isLoading ? (
                  <BiMicrophone size={64} />
                ) : (
                  <PiSparkleFill size={64} className="animate-thinking" />
                )}
              </button>

              {text && <p className="text-black">{text}</p>}
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
