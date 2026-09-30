import { Title } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { useGameStore } from '../../store/useGameStore';

export const StartMenu = () => {
  const { startGame } = useGameStore();

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-6 text-center animate-fade-in">
      <div className="space-y-4">
        <Title>Ruta 35</Title>
        <h2 className="text-2xl text-slate-300 font-semibold tracking-wider">
          Operación Hot Wheels
        </h2>
        <p className="text-slate-400 max-w-md mx-auto mt-4">
          De Huaca a Quito hay un largo camino. Recolecta las flores amarillas y esquiva los obstáculos para ganar tu recompensa.
        </p>
      </div>
      
      <Button onClick={startGame} variant="primary">
        Arrancar Motor 🚗
      </Button>
    </div>
  );
};