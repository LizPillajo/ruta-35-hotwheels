export const Button = ({ children, onClick, variant = 'primary' }) => {
  const baseStyles = "font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg";
  const variants = {
    primary: "bg-yellow-500 hover:bg-yellow-400 text-slate-900",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </button>
  );
};