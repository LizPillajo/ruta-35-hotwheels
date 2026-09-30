import { useGameStore } from '../../store/useGameStore';
import { GameBoard } from '../organisms/GameBoard';
import { MemoryGame } from '../organisms/MemoryGame';
import { PhrasePuzzle } from '../organisms/PhrasePuzzle';
import { Voucher } from '../organisms/Voucher';

const GamePage = () => {
  const { level, lives, showVoucher, isFinished, resetGame } = useGameStore();

  if (isFinished) {
    return (
      <main className="h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
        <div className="text-6xl mb-6">🌻🚗</div>
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
          ¡Ruta Completada!
        </h1>
        <p className="text-xl text-slate-300 max-w-md bg-slate-800 p-6 rounded-lg border-2 border-slate-700 shadow-xl">
          Gracias por jugar. Tu progreso, tus premios y tu deseo han quedado sellados oficialmente. <br/><br/>
          <span className="font-bold text-yellow-400">⚠️ Ya no se vale jugar más. ¡Ve a cobrar tus vales!</span>
        </p>
      </main>
    );
  }

  if (lives === 0) {
    return (
      <main className="h-screen w-full flex flex-col items-center justify-center bg-red-900 text-white space-y-6 p-4 text-center">
        <div className="text-8xl animate-bounce">💥</div>
        <h1 className="text-4xl md:text-5xl font-black">¡Llantas ponchadas!</h1>
        <button onClick={resetGame} className="bg-white hover:bg-slate-200 text-red-900 font-bold py-3 px-8 rounded-full">
          Intentar de nuevo 🔄
        </button>
      </main>
    );
  }

  const renderLevel = () => {
    switch (level) {
      case 1: 
        return (
          <>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 z-10">Ruta 35 🏀</h2>
            <GameBoard />
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
        return <PhrasePuzzle />;
      default: 
        return <GameBoard />;
    }
  };

  return (
    <main className="h-screen w-full flex flex-col items-center justify-center bg-slate-900 p-4 relative overflow-hidden">
      {showVoucher ? (
        <div className="z-20 flex flex-col items-center w-full">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 mb-8 text-center drop-shadow-md">
            ¡Nivel {level} Superado! 🎉
          </h2>
          <Voucher />
        </div>
      ) : (
        <div className="z-10 flex flex-col items-center w-full max-w-full">
          {renderLevel()}
        </div>
      )}
    </main>
  );
};

export default GamePage;