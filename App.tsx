import React, { useState } from 'react';
import CardGenerator from './components/CardGenerator';
import BingoGame from './components/BingoGame';

const App: React.FC = () => {
  const [view, setView] = useState<'game' | 'generator'>('game');

  return (
    <div className={`w-full ${view === 'game' ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      {view === 'game' ? (
        <BingoGame onGenerateCardClick={() => setView('generator')} />
      ) : (
        <CardGenerator onBack={() => setView('game')} />
      )}
    </div>
  );
};

export default App;