import { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';

export const PhrasePuzzle = () => {
  const { winLevel } = useGameStore();
  const [step, setStep] = useState(0);
  const [errorIndex, setErrorIndex] = useState(null);

  const steps = [
    { text: "Un ", blank: "detalle", q: "1. Sinónimo de regalo o atención hacia alguien:", opts: ["obsequio", "detalle", "premio"] },
    { text: " ", blank: "chiquito", q: "2. Antónimo cariñoso de 'gigante':", opts: ["pequeño", "chiquito", "menor"] },
    { text: " (y ", blank: "pixelado", q: "3. Cómo se ve un juego retro de baja resolución:", opts: ["borroso", "pixelado", "cuadrado"] },
    { text: ") para alguien ", blank: "especial", q: "4. Una persona que no es común y destaca es...", opts: ["especial", "rara", "única"] },
    { text: ". Que la ", blank: "distancia", q: "5. El espacio físico que separa Huaca de Quito se llama:", opts: ["carretera", "distancia", "viaje"] },
    { text: " no ", blank: "impida", q: "6. Sinónimo de obstaculizar o no dejar que algo pase:", opts: ["arruine", "impida", "evite"] },
    { text: " que ", blank: "tengas", q: "7. Verbo 'tener' en segunda persona del subjuntivo:", opts: ["tienes", "tengas", "tuviste"] },
    { text: " un ", blank: "bonito", q: "8. Sinónimo de lindo, o también un pez que suele venir en lata:", opts: ["hermoso", "bonito", "atún"] },
    { text: " ", blank: "30", q: "9. ¿Qué día exacto se regalan los carritos de colección?", opts: ["21", "29", "30"] },
    { text: " de ", blank: "septiembre", q: "10. Mes donde se regalan flores amarillas:", opts: ["agosto", "septiembre", "octubre"] },
    // Aquí está el salto de línea (\n\n) para el Psdt
    { text: " <3.\n\nPsdt: Toma ", blank: "agüita", q: "11. Líquido vital (en diminutivo) que Dai te manda a tomar:", opts: ["agüita", "cafecito", "juguito"] },
    { text: " :p", blank: null, q: null, opts: [] } 
  ];

  const handleAnswer = (selected, idx) => {
    if (selected === steps[step].blank) {
      const nextStep = step + 1;
      setStep(nextStep);
      
      if (nextStep === steps.length - 1) {
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
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto z-10 animate-fade-in p-2 md:p-4">
      <div className="bg-slate-800 p-4 md:p-8 rounded-xl shadow-2xl border-2 border-slate-600 w-full transition-all">
        
        <h3 className="text-yellow-400 font-bold text-xl mb-2 text-center">Nivel 3: El Mensaje Encriptado 💌</h3>
        <p className="text-slate-300 mb-6 text-xs md:text-sm text-center">
          Responde correctamente para desencriptar la carta. Si te equivocas, vuelve a intentar.
        </p>
        
        {/* Agregamos whitespace-pre-wrap aquí para que respete los saltos de línea */}
        <div className="bg-slate-700 p-4 rounded-lg text-lg md:text-2xl leading-relaxed font-serif italic text-slate-100 mb-8 min-h-[150px] whitespace-pre-wrap">
          {steps.slice(0, step).map((part, i) => (
            <span key={i}>
              {part.text}
              <span className="text-yellow-400 font-bold underline decoration-yellow-400/50 underline-offset-4">
                {part.blank}
              </span>
            </span>
          ))}
          {step < steps.length - 1 && (
            <span>
              {steps[step].text}
              <span className="inline-block w-16 md:w-24 border-b-2 border-slate-400 animate-pulse"></span>
            </span>
          )}
          {step === steps.length - 1 && <span> :p</span>}
        </div>

        {step < steps.length - 1 ? (
          <div className="w-full animate-fade-in">
            <p className="text-white font-bold text-center mb-4 min-h-[48px]">
              {steps[step].q}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {steps[step].opts.map((opt, idx) => (
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
          </div>
        ) : (
          <p className="text-yellow-400 mt-6 font-bold text-center animate-pulse uppercase tracking-widest">
            ¡Desencriptación completa! Generando vale...
          </p>
        )}
      </div>
    </div>
  );
};