import React from 'react';

interface BingoCardProps {
  word: string;
  isDrawn: boolean;
}

const BingoCard: React.FC<BingoCardProps> = ({ word, isDrawn }) => {
  const isFreeSpace = word === 'Free Space';

  const baseClasses = 'aspect-square flex items-center justify-center p-1 text-center rounded-lg shadow-md transition-all duration-500';
  const textClasses = 'text-xs sm:text-sm font-medium';

  // State-specific classes
  const undrawnClasses = 'bg-slate-700 hover:bg-slate-600 text-slate-200';
  const drawnClasses = 'bg-red-600 text-white';
  const freeSpaceClasses = 'bg-amber-500/90 text-slate-900 font-bold';

  // Determine classes based on state
  const finalClasses = `
    ${baseClasses} 
    ${textClasses} 
    ${isFreeSpace ? freeSpaceClasses : isDrawn ? drawnClasses : undrawnClasses}
  `;

  return (
    <div className={finalClasses}>
      <span>{word}</span>
    </div>
  );
};

export default BingoCard;