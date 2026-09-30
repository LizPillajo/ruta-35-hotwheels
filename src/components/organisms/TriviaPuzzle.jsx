import { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';

export const TriviaPuzzle = () => {
  const { winLevel } = useGameStore();
  const [step, setStep] = useState(0);
  const [errorIndex, setErrorIndex] = useState(null);

  // Las preguntas que irán revelando la frase
  const questions = [
    {
      q: "1. Artículo indefinido en español usado para presentar un sustantivo masculino o una unidad:",
      opts: ["El", "Ese", "Un"],
      ans: "Un"
    },
    {
      q: "2. Antónimo directo de la palabra 'gigante':",
      opts: ["Pequeño", "Chiquito", "Minúsculo"],
      ans: "Chiquito"
    },
    {
      q: "3. El espacio físico que separa Huaca de Quito se llama...",
      opts: ["Tiempo", "Carretera", "Distancia"],
      ans: "Distancia"
    },
    {
      q: "4. Líquido vital que debes tomar siempre (hazle caso a Liz):",
      opts: ["Café", "Agüita", "Cola"],
      ans: "Agüita"
    }
  ];

  const handleAnswer = (selected, index) => {
    if (selected === questions[step].ans) {
      const nextStep = step + 1;
      setStep(nextStep);
      
      // Si respondió la última pregunta, lanzamos el vale final después de 12 segundos para que lea
      if (nextStep === questions.length) {
        setTimeout(() => {
          winLevel("Vale por un Hot Wheel real (a entregar en persona)");
        }, 12000); 
      }
    } else {
      // Animación de error si se equivoca
      setErrorIndex(index);
      setTimeout(() => setErrorIndex(null), 800);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto z-10 animate-fade-in p-4">
      <div className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl border-2 border-slate-600 w-full transition-all">
        
        {step < questions.length ? (
          <div className="animate-fade-in">
            <h3 className="text-yellow-400 font-bold text-xl mb-6">Nivel 3: Preguntas de Seguridad 🔐</h3>
            
            <p className="text-white text-lg mb-6 min-h-[60px]">
              {questions[step].q}
            </p>
            
            <div className="flex flex-col space-y-3">
              {questions[step].opts.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt, i)}
                  className={`
                    py-3 px-6 rounded-lg font-bold transition-all text-left border-2
                    ${errorIndex === i 
                      ? 'bg-red-500 border-red-700 animate-shake text-white' 
                      : 'bg-slate-700 border-slate-500 text-slate-200 hover:bg-slate-600 hover:border-yellow-400'
                    }
                  `}
                >
                  {opt}
                </button>
              ))}
            </div>
            <p className="text-slate-400 mt-6 text-sm text-center">Progreso: {step}/4</p>
          </div>
        ) : (
          <div className="animate-fade-in text-left bg-slate-700/50 p-6 rounded-lg border-l-4 border-yellow-400 shadow-lg">
            <p className="text-slate-100 text-lg md:text-xl leading-relaxed font-serif italic">
              "Un detalle chiquito (y pixelado) para alguien gigante. Que la distancia no impida que tengas un bonito 30 de septiembre &lt;3. 
              <br/><br/>
              Psdt: Toma agüita :p"
            </p>
            <p className="text-yellow-400 mt-6 text-xs md:text-sm font-bold text-center animate-pulse uppercase tracking-widest">
              Desbloqueando regalo final...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};