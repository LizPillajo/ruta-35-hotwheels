import { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';

export const PhrasePuzzle = () => {
  const { winLevel } = useGameStore();
  const [step, setStep] = useState(0);
  const [errorIndex, setErrorIndex] = useState(null);

  // La frase dividida en las palabras clave que pediste
  const phraseParts = [
    { text: "Un ", blank: "detalle", opts: ["regalo", "detalle", "momento"] },
    { text: " ", blank: "chiquito", opts: ["inmenso", "caro", "chiquito"] },
    { text: " (y ", blank: "pixelado", opts: ["pixelado", "borroso", "lento"] },
    { text: ") para alguien ", blank: "especial", opts: ["normal", "especial", "cualquiera"] },
    { text: ". Que la ", blank: "distancia", opts: ["distancia", "pereza", "vida"] },
    { text: " no ", blank: "impida", opts: ["arruine", "impida", "evite"] },
    { text: " que ", blank: "tengas", opts: ["compres", "tengas", "busques"] },
    { text: " un ", blank: "bonito", opts: ["simple", "bonito", "raro"] },
    { text: " ", blank: "30", opts: ["29", "30", "31"] },
    { text: " de ", blank: "septiembre", opts: ["septiembre", "octubre", "agosto"] },
    { text: " <3. Psdt: Toma ", blank: "agüita", opts: ["cerveza", "agüita", "café"] },
    { text: " :p", blank: null, opts: [] } // Final
  ];

  const handleAnswer = (selected, idx) => {
    if (selected === phraseParts[step].blank) {
      const nextStep = step + 1;
      setStep(nextStep);
      
      if (nextStep === phraseParts.length - 1) {
        // Al completar, espera exactamente 3 segundos y lanza el premio final
        setTimeout(() => {
          winLevel("Vale por el regalo que tú elijas (a cuenta de Dai 💳)");
        }, 3000); 
      }
    } else {
      setErrorIndex(idx);
      setTimeout(() => setErrorIndex(null), 800);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto z-10 animate-fade-in p-4">
      <div className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl border-2 border-slate-600 w-full">
        
        <h3 className="text-yellow-400 font-bold text-xl mb-4 text-center">Nivel 3: El Mensaje Oculto 💌</h3>
        <p className="text-slate-300 mb-6 text-sm text-center">
          Selecciona las palabras correctas para completar la frase. Si te equivocas, ¡intenta de nuevo!
        </p>
        
        {/* Frase construyéndose dinámicamente */}
        <div className="bg-slate-700 p-4 rounded-lg text-lg md:text-2xl leading-relaxed font-serif italic text-slate-100 mb-8 min-h-[150px]">
          {phraseParts.slice(0, step).map((part, i) => (
            <span key={i}>
              {part.text}
              <span className="text-yellow-400 font-bold underline decoration-yellow-400/50 underline-offset-4">
                {part.blank}
              </span>
            </span>
          ))}
          {step < phraseParts.length - 1 && (
            <span>
              {phraseParts[step].text}
              <span className="inline-block w-24 border-b-2 border-slate-400 animate-pulse"></span>
            </span>
          )}
          {step === phraseParts.length - 1 && <span> :p</span>}
        </div>

        {/* Opciones para la palabra actual */}
        {step < phraseParts.length - 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {phraseParts[step].opts.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt, idx)}
                className={`
                  py-3 px-4 rounded-lg font-bold transition-all text-center border-2
                  ${errorIndex === idx 
                    ? 'bg-red-500 border-red-700 animate-shake text-white' 
                    : 'bg-slate-700 border-slate-500 text-slate-200 hover:bg-slate-600 hover:border-yellow-400'
                  }
                `}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-yellow-400 mt-6 font-bold text-center animate-pulse uppercase tracking-widest">
            ¡Mensaje completado! Generando vale...
          </p>
        )}
      </div>
    </div>
  );
};