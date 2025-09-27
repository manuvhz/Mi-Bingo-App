import React, { useState, useCallback, useRef, useEffect } from 'react';
import { WORDS } from '../constants';
import Confetti from './Confetti';
import PrintableCard from './PrintableCard';
import { BackIcon } from './icons/BackIcon';
import { CardIcon } from './icons/CardIcon';

interface CardGeneratorProps {
  onBack: () => void;
}

const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const generateCardWords = (): string[] => {
  const availableWords = WORDS.filter(word => word !== 'Free Space');
  const shuffled = shuffleArray(availableWords);
  const cardWords = shuffled.slice(0, 24);
  cardWords.splice(12, 0, 'Free Space');
  return cardWords;
};

const CardGenerator: React.FC<CardGeneratorProps> = ({ onBack }) => {
  const [cards, setCards] = useState<string[][]>([]);
  const [numCards, setNumCards] = useState<number>(1);
  const [confettiKey, setConfettiKey] = useState(0);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const handleGenerateNewCards = useCallback(() => {
    setConfettiKey(prev => prev + 1);
    const newCards = Array.from({ length: numCards }, () => generateCardWords());
    setCards(newCards);
  }, [numCards]);

  useEffect(() => {
    handleGenerateNewCards();
  }, []); // Generate initial card(s) on mount

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 to-sky-800 text-white p-4 sm:p-6 overflow-y-auto">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <Confetti key={confettiKey} />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto">
        <header className="text-center mb-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-emerald-300">
            Bingo Card Generator
          </h1>
          <p className="mt-2 text-sky-200/80">Generate your unique bingo cards and take a screenshot!</p>
        </header>

        <div className="w-full sticky top-0 z-20 bg-slate-900/80 backdrop-blur-sm py-4 mb-6 rounded-xl shadow-lg">
          <div className="flex flex-wrap items-center justify-center gap-3 px-4">
            <button onClick={onBack} className="flex items-center justify-center px-4 py-2 font-semibold text-sky-300 hover:text-sky-100 transition-colors">
              <BackIcon className="w-5 h-5 mr-2" />
              <span>Back to Game</span>
            </button>
            <div className="flex items-center gap-2">
              <label htmlFor="num-cards" className="font-semibold text-slate-300">Cards:</label>
              <select
                id="num-cards"
                value={numCards}
                onChange={(e) => setNumCards(Number(e.target.value))}
                className="bg-slate-700 border border-slate-600 rounded-md px-2 py-1 text-white font-semibold"
              >
                {[...Array(12).keys()].map(n => <option key={n+1} value={n+1}>{n+1}</option>)}
              </select>
            </div>
            <button onClick={handleGenerateNewCards} className="flex items-center justify-center px-5 py-2 font-bold text-slate-900 bg-gradient-to-r from-amber-300 to-orange-400 rounded-full shadow-lg transition-transform transform hover:scale-105">
              <CardIcon className="w-5 h-5 mr-2" />
              Generate New
            </button>
          </div>
        </div>

        <main id="printable-area" ref={cardsContainerRef} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {cards.map((cardWords, index) => (
                    <PrintableCard key={index} words={cardWords} />
                ))}
            </div>
        </main>
      </div>
    </div>
  );
};

export default CardGenerator;