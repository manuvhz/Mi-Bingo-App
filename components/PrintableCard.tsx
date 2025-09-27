import React, { forwardRef } from 'react';

interface PrintableCardProps {
  words: string[];
}

const PrintableCard = forwardRef<HTMLDivElement, PrintableCardProps>(({ words }, ref) => {
  const bingoHeaders = ['B', 'I', 'N', 'G', 'O'];

  return (
    <div className="printable-card-wrapper inline-block" ref={ref}>
      <div className="w-full max-w-md mx-auto bg-slate-800 p-3 sm:p-4 rounded-lg shadow-2xl border border-slate-700">
        <div className="grid grid-cols-5 gap-2 sm:gap-3 text-center mb-3">
          {bingoHeaders.map(header => (
            <div key={header} className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-poppins">
              {header}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {words.map((word, index) => {
            const isFreeSpace = word === 'Free Space';
            return (
              <div
                key={index}
                className={`
                  aspect-square flex items-center justify-center p-1 text-center rounded-md
                  ${isFreeSpace 
                    ? 'bg-amber-500 text-slate-900 font-bold text-sm sm:text-base' 
                    : 'bg-slate-700 text-slate-200 text-sm sm:text-lg'}
                `}
              >
                {word}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default PrintableCard;