import { useState, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';

const ITEMS = ['🏔️', '🌅', '🌕', '🪐', '✨', '💻', '🎟️', '🎸'];

export const MemoryGame = () => {
  const { winLevel } = useGameStore();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const shuffledCards = [...ITEMS, ...ITEMS]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ id: index, content: item }));
    setCards(shuffledCards);
  }, []);

  const handleCardClick = (index) => {
    if (disabled || flipped.includes(index) || solved.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const [firstIndex, secondIndex] = newFlipped;

      if (cards[firstIndex].content === cards[secondIndex].content) {
        setSolved((prev) => {
          const newSolved = [...prev, firstIndex, secondIndex];
          if (newSolved.length === cards.length) {
            setTimeout(() => {
              winLevel("Vale por lo que quieras (Escribe tu deseo)");
            }, 1000);
          }
          return newSolved;
        });
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto z-10 animate-fade-in">
      <div className="bg-slate-800 p-6 rounded-xl shadow-2xl border-2 border-slate-600 w-full">
        <div className="flex justify-between items-center mb-6">
          <span className="text-white font-bold">Pares: {solved.length / 2} / 8</span>
          <span className="text-green-400 font-bold">Nivel 2</span>
        </div>
        
        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {cards.map((card, index) => {
            const isFlipped = flipped.includes(index) || solved.includes(index);
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`
                  aspect-square flex items-center justify-center text-3xl md:text-4xl rounded-lg transition-all duration-300 transform perspective-1000
                  ${isFlipped ? 'bg-cyan-50 text-cyan-900 rotate-y-180 shadow-inner' : 'bg-slate-700 hover:bg-slate-600 shadow-md border-2 border-green-500/30'}
                  ${solved.includes(index) ? 'opacity-50' : ''}
                `}
              >
                {isFlipped ? card.content : <span className="text-green-400 font-black text-4xl">?</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};