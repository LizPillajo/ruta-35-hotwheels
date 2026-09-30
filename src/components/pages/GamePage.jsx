import { useGameStore } from '../../store/useGameStore';
import { GameBoard } from '../organisms/GameBoard';
import { MemoryGame } from '../organisms/MemoryGame';
import { Voucher } from '../organisms/Voucher';

const GamePage = () => {
  const { level, lives, showVoucher, resetGame } = useGameStore();

  if (lives === 0) {
    return (
      <main className="h-screen w-full flex flex-col items-center justify-center bg-red-900 text-white space-y-6">
        <div className="text-8xl animate-bounce">💥</div>
        <h1 className="text-5xl font-black">¡Llantas ponchadas!</h1>
        <button onClick={resetGame} className="bg-white hover:bg-slate-200 text-red-900 font-bold py-3 px-8 rounded-full">
          Intentar de nuevo 🔄
        </button>
      </main>
    );
  }

  // Renderizado dinámico según el nivel
  const renderLevel = () => {
    switch (level) {
      case 1: 
        return (
          <>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 z-10">Ruta 35 🏀</h2>
            <GameBoard />
            <p className="text-slate-400 mt-4 text-sm font-mono bg-slate-800 px-4 py-2 rounded-full z-10">
              Usa las flechas ⬅️ y ➡️
            </p>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 z-10">Acordes y Memoria 🎸</h2>
            <MemoryGame />
          </>
        );
      case 3:
        // Mañana agregaremos el crucigrama aquí
        return <h2 className="text-white z-10">Nivel 3 en construcción...</h2>;
      default: 
        return <GameBoard />;
    }
  };

  return (
    <main className="h-screen w-full flex flex-col items-center justify-center bg-slate-900 p-4 relative overflow-hidden">
      {showVoucher ? (
        <div className="z-20 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 mb-8 text-center drop-shadow-md">
            ¡Nivel {level} Superado! 🎉
          </h2>
          <Voucher />
        </div>
      ) : (
        <div className="z-10 flex flex-col items-center w-full">
          {renderLevel()}
        </div>
      )}
    </main>
  );
};

export default GamePage;