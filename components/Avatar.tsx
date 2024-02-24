'use client';

import React, { useEffect, useState } from 'react';
import { BiMicrophone } from 'react-icons/bi';
import AvatarImage from '@/public/Avatar.png';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Avatar() {
  const [text, setText] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setIsSupported(false);
    }
  }, []);

  const startSpeaking = () => {
    
  }

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) || !isSupported) {
      return
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'tr-TR';
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };
    recognition.start();

    recognition.onstart = () => {
      setIsListening(true);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex relative h-full w-full flex-col justify-center items-center">
        <div className="inset-0 absolute -z-10">
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
        <div className="mt-[48svh]">
          <>
            {isListening ? (
              <motion.div
                initial={{ width: 'auto' }}
                animate={{ width: '300px' }}
                className="bg-white flex gap-4 rounded-full text-main animate-pulse"
              >
                <BiMicrophone size={64} />
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.08, type: 'tween', duration: .8}} className="pl-16 relative w-[90%]">
                  <h1 className="text-xl font-medium absolute top-[25%] inset-0">
                    Konuşmaya başla...
                  </h1>
                </motion.div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <button
                  className="w-24 h-24 bg-white/80 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 transition active:scale-90 backdrop-blur-lg text-main p-4 rounded-full"
                  onClick={startListening}
                  disabled={!isSupported}
                >
                  <BiMicrophone size={64} />
                </button>
                {text && <p>{text}</p>}
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
}
