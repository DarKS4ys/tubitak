"use client"
import React, { useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { Cursor, useTypewriter } from 'react-simple-typewriter';

const Typewriter = () => {
    const [shouldFinish, setShouldFinish] = useState(false);

    const [text] = useTypewriter({
        words: ['Ziyaret et', 'Yeni yerler keşfet', 'Keşfet', 'Göz at'],
        loop: true,
        typeSpeed: shouldFinish ? 25 : 50,
        onLoopDone: () => {
            if (shouldFinish) {
                setShouldFinish(false);
            }
        }
    });

    const handleHover = () => {
        setShouldFinish(!shouldFinish);
    };

    return (
        <span onMouseEnter={handleHover} onMouseLeave={handleHover} className="text-2xl flex items-center leading-[1] uppercase font-mono">
            {text}
            <Cursor/>
            <BiChevronRight/>
        </span>
    );
};

export default Typewriter;