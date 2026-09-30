export const Title = ({ children, className = "" }) => (
  <h1 className={`text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 ${className}`}>
    {children}
  </h1>
);