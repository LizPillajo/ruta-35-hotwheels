import { useGameStore } from '../../store/useGameStore';
import { GameBoard } from '../organisms/GameBoard';
import { Voucher } from '../organisms/Voucher';

const GamePage = () => {
  const { level, lives, showVoucher, resetGame } = useGameStore();

  if (lives === 0) {
    return (
      <main className="h-screen w-full flex flex-col items-center justify-center bg-red-900 text-white space-y-6">
        <div className="text-8xl animate-bounce">💥</div>
        <h1 className="text-5xl font-black">¡Llantas ponchadas!</h1>
        <p className="text-xl text-red-200 text-center max-w-md">
          El Hot Wheel se quedó a medio camino de Quito. ¡A Julián le falta práctica!
        </p>
        <button 
          onClick={resetGame}
          className="bg-white hover:bg-slate-200 text-red-900 font-bold py-3 px-8 rounded-full transition-all shadow-lg"
        >
          Intentar de nuevo 🔄
        </button>
      </main>
    );
  }

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
        <div className="z-10 flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">
            {level === 1 ? 'Salida: Huaca 🏔️' : level === 2 ? 'Ruta: Imbabura 🏞️' : 'Meta: Quito 🏙️'}
          </h2>
          <GameBoard />
          <p className="text-slate-400 mt-4 text-sm font-mono bg-slate-800 px-4 py-2 rounded-full">
            Usa las flechas ⬅️ y ➡️ para moverte
          </p>
        </div>
      )}
    </main>
  );
};

export default GamePage;