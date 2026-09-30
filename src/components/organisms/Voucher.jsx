import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useGameStore } from '../../store/useGameStore';
import { Button } from '../atoms/Button';

export const Voucher = () => {
  const { level, currentVoucher, nextLevel } = useGameStore();
  const [wish, setWish] = useState('');
  const [wishSaved, setWishSaved] = useState(false);

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#FBBF24', '#FFFFFF'] 
    });
  }, []);

  const handleSaveWish = () => {
    if (wish.trim() === '') return;
    setWishSaved(true);
  };

  return (
    <div className="flex flex-col items-center space-y-8 animate-fade-in">

      <div className="bg-amber-100 text-amber-900 p-8 rounded-lg border-4 border-dashed border-amber-500 shadow-2xl max-w-sm w-full relative overflow-hidden transform rotate-1 hover:rotate-0 transition-transform">
        <div className="absolute top-2 left-2 text-4xl opacity-50">🎟️</div>
        
        <h3 className="text-2xl font-black text-center mb-4 uppercase tracking-widest text-amber-600 border-b-2 border-amber-300 pb-2">
          Vale Oficial
        </h3>
        
        <p className="text-xl text-center font-bold mb-6 min-h-[60px] flex items-center justify-center">
          {currentVoucher}
        </p>

        {level === 2 && !wishSaved && (
          <div className="flex flex-col space-y-3 mt-4">
            <textarea 
              className="w-full p-3 border-2 border-amber-300 rounded-md text-slate-800 focus:outline-none focus:border-amber-500 bg-white/80"
              placeholder="Escribe tu deseo aquí..."
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              rows="3"
            />
            <button 
              onClick={handleSaveWish}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded-md transition-colors"
            >
              Sellar Deseo ✍️
            </button>
          </div>
        )}

        {level === 2 && wishSaved && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center mt-4 font-bold animate-pulse">
            ¡Deseo sellado y enviado a la jefatura! ✅
          </div>
        )}
      </div>

      <Button onClick={nextLevel} variant="primary">
        {level === 3 ? "Volver al Inicio 🔄" : "Siguiente Nivel 🏁"}
      </Button>
    </div>
  );
};