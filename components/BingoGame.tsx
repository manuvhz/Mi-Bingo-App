import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WORDS } from '../constants';
import BingoBoard from './BingoBoard';
import Confetti from './Confetti';
import { RestartIcon } from './icons/RestartIcon';
import { SparkleIcon } from './icons/SparkleIcon';
import { CardIcon } from './icons/CardIcon';

interface BingoGameProps {
  onGenerateCardClick: () => void;
}

const BingoGame: React.FC<BingoGameProps> = ({ onGenerateCardClick }) => {
  const initialDrawnWords = new Set<string>(['Free Space']);
  const wordsToDraw = WORDS.filter(w => w !== 'Free Space');

  const [drawnWords, setDrawnWords] = useState<Set<string>>(initialDrawnWords);
  const [currentWord, setCurrentWord] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [rouletteWord, setRouletteWord] = useState<string>('');
  const [confettiKey, setConfettiKey] = useState<number>(0);

  const successAudioRef = useRef<HTMLAudioElement>(null);
  const rouletteAudioRef = useRef<HTMLAudioElement>(null);
  const resetAudioRef = useRef<HTMLAudioElement>(null);
  const rouletteIntervalRef = useRef<number | null>(null);

  const stopRoulette = useCallback(() => {
    if (rouletteIntervalRef.current) {
      clearInterval(rouletteIntervalRef.current);
      rouletteIntervalRef.current = null;
    }
    if (rouletteAudioRef.current) {
      rouletteAudioRef.current.pause();
      rouletteAudioRef.current.currentTime = 0;
    }
  }, []);

  const handleDrawWord = useCallback(() => {
    const undrawnWords = wordsToDraw.filter(word => !drawnWords.has(word));
    if (isDrawing || undrawnWords.length === 0) return;

    setIsDrawing(true);
    setCurrentWord(null);
    rouletteAudioRef.current?.play();

    rouletteIntervalRef.current = window.setInterval(() => {
      const randomIndex = Math.floor(Math.random() * undrawnWords.length);
      setRouletteWord(undrawnWords[randomIndex]);
    }, 70);

    setTimeout(() => {
      stopRoulette();

      const drawnIndex = Math.floor(Math.random() * undrawnWords.length);
      const newWord = undrawnWords[drawnIndex];

      setCurrentWord(newWord);
      setDrawnWords(prev => new Set(prev).add(newWord));
      setIsDrawing(false);
      setConfettiKey(prev => prev + 1);
      successAudioRef.current?.play();
    }, 2500);
  }, [isDrawing, drawnWords, stopRoulette, wordsToDraw]);

  const handleResetGame = () => {
    stopRoulette();
    resetAudioRef.current?.play();
    setIsDrawing(false);
    setCurrentWord(null);
    setRouletteWord('');
    setDrawnWords(initialDrawnWords);
    setConfettiKey(prev => prev + 1);
  };

  useEffect(() => {
    return () => {
      stopRoulette();
    };
  }, [stopRoulette]);
  
  const remainingWordsCount = wordsToDraw.length - (drawnWords.size - 1);

  return (
    <div className="relative h-full w-full bg-gradient-to-br from-slate-900 via-sky-900 to-emerald-900 text-white p-2 sm:p-4 lg:p-6">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <Confetti key={confettiKey} />

      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <header className="text-center mb-2 sm:mb-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
            Verbs Bingo
          </h1>
          <p className="mt-1 sm:mt-2 text-sky-200/80 text-base sm:text-lg">Words remaining: {remainingWordsCount}</p>
        </header>

        <main className="w-full max-w-5xl flex-grow flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-4 lg:gap-8">
          <div className="flex flex-col items-center justify-center gap-4 w-full lg:w-1/3">
            <div className="w-64 h-28 bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl flex items-center justify-center perspective-container">
              {currentWord && (
                <div className="animate-fade-in-up text-4xl font-bold text-center text-amber-300 font-poppins tracking-wider">
                  {currentWord}
                </div>
              )}
              {isDrawing && (
                <div className="text-3xl font-semibold text-center text-gray-300 animate-pulse">
                  {rouletteWord}
                </div>
              )}
              {!isDrawing && !currentWord && (
                <div className="text-xl text-gray-400">Press the button!</div>
              )}
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handleDrawWord}
                disabled={isDrawing || remainingWordsCount === 0}
                className="group relative flex items-center justify-center w-64 h-14 px-8 py-4 font-bold text-slate-900 bg-gradient-to-r from-amber-300 to-orange-400 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></span>
                <SparkleIcon className="w-6 h-6 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                <span className="relative z-10">{isDrawing ? 'Drawing...' : 'Sortear palabra'}</span>
              </button>
              
              <button
                onClick={onGenerateCardClick}
                className="group relative flex items-center justify-center w-64 h-12 px-8 py-3 font-semibold text-white bg-sky-600/80 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-sky-500"
              >
                 <CardIcon className="w-5 h-5 mr-2" />
                <span className="relative z-10">Generar Cartón</span>
              </button>

              <button
                onClick={handleResetGame}
                className="flex items-center gap-2 text-sky-300/80 hover:text-sky-200 transition-colors mt-2"
              >
                <RestartIcon className="w-4 h-4" />
                <span>Reiniciar juego</span>
              </button>
            </div>
          </div>

          <div className="w-full lg:w-2/3 flex items-center justify-center">
            <BingoBoard words={WORDS} drawnWords={drawnWords} />
          </div>
        </main>
        
        <audio ref={successAudioRef} src="https://cdn.freesound.org/previews/518/518367_5234143-lq.mp3" preload="auto"></audio>
        <audio ref={rouletteAudioRef} src="https://cdn.freesound.org/previews/145/145438_2123969-lq.mp3" loop preload="auto"></audio>
        <audio ref={resetAudioRef} src="https://cdn.freesound.org/previews/219/219244_4103137-lq.mp3" preload="auto"></audio>
      </div>
    </div>
  );
};

export default BingoGame;