export const Button = ({ children, onClick, variant = 'primary' }) => {
  const baseStyles = "font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg";
  const variants = {
    primary: "bg-gradient-to-r from-emerald-300 to-cyan-300 hover:from-emerald-200 hover:to-cyan-200 text-slate-800",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </button>
  );
};