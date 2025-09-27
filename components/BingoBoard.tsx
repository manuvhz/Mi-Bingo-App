import React from 'react';
import BingoCard from './BingoCard';

interface BingoBoardProps {
  words: string[];
  drawnWords: Set<string>;
}

const BingoBoard: React.FC<BingoBoardProps> = ({ words, drawnWords }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-2 sm:p-3 rounded-2xl shadow-2xl">
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {words.map((word, index) => (
          <BingoCard key={index} word={word} isDrawn={drawnWords.has(word)} />
        ))}
      </div>
    </div>
  );
};

export default BingoBoard;