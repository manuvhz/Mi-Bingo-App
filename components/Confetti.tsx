
import React, { useEffect, useState } from 'react';

const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const newPieces = Array.from({ length: 30 }).map((_, index) => {
      const colors = ['#f59e0b', '#10b981', '#0ea5e9', '#ec4899'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = `${Math.random() * 100}vw`;
      const animationDuration = `${2 + Math.random() * 2}s`;
      const animationDelay = `${Math.random() * 2}s`;
      const style = {
        left,
        backgroundColor: color,
        animationDuration,
        animationDelay,
        transform: `rotate(${Math.random() * 360}deg)`
      };
      return <div key={index} className="confetti" style={style}></div>;
    });
    setPieces(newPieces);
  }, []);

  return <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-50">{pieces}</div>;
};

export default Confetti;
