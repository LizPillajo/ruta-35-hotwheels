import { useGameStore } from '../../store/useGameStore';
import { GameBoard } from '../organisms/GameBoard';
import { MemoryGame } from '../organisms/MemoryGame';
import { PhrasePuzzle } from '../organisms/PhrasePuzzle';
import { Voucher } from '../organisms/Voucher';

const GamePage = () => {
  const { level, lives, showVoucher, isFinished, startGame } = useGameStore();

  if (isFinished) {
    return (
      <main className="h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
        <div className="text-6xl mb-6">🌻🚗</div>
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500 mb-4">
          ¡Ruta Completada!
        </h1>
        <p className="text-xl text-slate-300 max-w-md bg-slate-800 p-6 rounded-lg border-2 border-slate-700 shadow-xl">
          Gracias por jugar. Tu progreso, tus premios y tu deseo han quedado sellados oficialmente. <br/><br/>
          <span className="font-bold text-green-400">⚠️ Ya no se vale jugar más :p </span>
          <span className="font-bold text-green-400"> ¡Que tengas bonito día Julián!</span>
        </p>
      </main>
    );
  }

  if (lives === 0) {
    return (
      <main className="h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white space-y-6 p-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-rose-900/20"></div>
        <div className="text-8xl animate-bounce relative z-10">💥</div>
        <h1 className="text-4xl md:text-5xl font-black text-rose-400 relative z-10">¡Llantas ponchadas!</h1>
        <button onClick={startGame} className="bg-slate-800 hover:bg-slate-700 text-rose-300 border-2 border-rose-500/50 font-bold py-3 px-8 rounded-full transition-all relative z-10 shadow-[0_0_15px_rgba(244,63,94,0.3)] hover:shadow-[0_0_25px_rgba(244,63,94,0.5)]">
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
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 z-10"> Memoria 🧠</h2>
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
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-500 mb-8 text-center drop-shadow-md">
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