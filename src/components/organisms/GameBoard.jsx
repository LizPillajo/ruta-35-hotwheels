import { useState, useEffect, useCallback, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';

export const GameBoard = () => {
  const { level, lives, flowers, flowersNeeded, collectFlower, loseLife, winLevel } = useGameStore();
  
  const [carPosition, setCarPosition] = useState(50);
  const [items, setItems] = useState([]);

  const carPosRef = useRef(carPosition);
  const stateRef = useRef({ flowers, flowersNeeded, level });
  const itemsRef = useRef([]); 

  useEffect(() => { carPosRef.current = carPosition; }, [carPosition]);
  useEffect(() => { stateRef.current = { flowers, flowersNeeded, level }; }, [flowers, flowersNeeded, level]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      setCarPosition((prev) => Math.max(10, prev - 15));
    } else if (e.key === 'ArrowRight') {
      setCarPosition((prev) => Math.min(90, prev - -15));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const gameSpeed = level === 1 ? 100 : level === 2 ? 85 : 70; 
    
    const interval = setInterval(() => {
      let currentItems = itemsRef.current.map(item => ({ ...item, y: item.y + 5 }));
      
      let hitFlower = false;
      let hitObstacle = false;

      currentItems = currentItems.filter(item => {
        if (item.y > 85 && item.y < 95 && Math.abs(item.x - carPosRef.current) < 10) {
          if (item.type === 'flower') hitFlower = true;
          else hitObstacle = true;
          return false;
        }
        return item.y < 100; 
      });

      if (Math.random() < 0.15) {
        currentItems.push({
          id: Date.now(),
          x: Math.floor(Math.random() * 80) + 10,
          y: 0,
          type: Math.random() > 0.5 ? 'flower' : 'obstacle'
        });
      }

      itemsRef.current = currentItems;
      setItems(currentItems);

      if (hitFlower) {
        collectFlower();
        const current = stateRef.current;
        if (current.flowers + 1 >= current.flowersNeeded) {
          const premios = [
            "Vale por tener la razón sin que Dai pueda reclamar",
            "Vale por lo que quieras (Escribe tu deseo)",
            "Vale por un Hot Wheel real (a entregar en persona)"
          ];
          winLevel(premios[current.level - 1]);
        }
      }

      if (hitObstacle) {
        loseLife(); 
      }

    }, gameSpeed);

    return () => clearInterval(interval);
  }, [collectFlower, loseLife, winLevel, level]);

  const bgColors = {
    1: 'bg-green-800',
    2: 'bg-blue-900', 
    3: 'bg-slate-700' 
  };

  return (
    <div className={`relative w-full max-w-md h-[600px] mx-auto overflow-hidden border-4 border-slate-600 rounded-lg shadow-2xl ${bgColors[level]}`}>
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between text-white z-10 bg-black/40">
        <span className="font-bold">Nivel {level}</span>
        <span className="font-bold text-yellow-400">🏀 {flowers} / {flowersNeeded}</span>
        <span>{'❤️'.repeat(lives)}</span>
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          className="absolute text-3xl transition-transform"
          style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          {item.type === 'flower' ? '🏀' : '🚧'}
        </div>
      ))}

      <div
        className="absolute bottom-10 text-5xl transition-all duration-75"
        style={{ left: `${carPosition}%`, transform: 'translateX(-50%)' }}
      >
        🏎️
      </div>

      <div className="absolute bottom-4 left-0 w-full flex justify-between px-6 z-20 sm:hidden">
        <button 
          onClick={() => setCarPosition((prev) => Math.max(10, prev - 15))}
          className="bg-white/20 p-4 rounded-full text-2xl active:bg-white/50 backdrop-blur-sm border border-white/30"
        >
          ⬅️
        </button>
        <button 
          onClick={() => setCarPosition((prev) => Math.min(90, prev - -15))}
          className="bg-white/20 p-4 rounded-full text-2xl active:bg-white/50 backdrop-blur-sm border border-white/30"
        >
          ➡️
        </button>
      </div>
    </div>
  );
};