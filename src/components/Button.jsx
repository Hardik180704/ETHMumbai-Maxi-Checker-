import { motion } from 'framer-motion';

export default function Button({ children, onClick, variant = 'primary', className = '' }) {
  const baseStyle = "px-8 py-3 rounded-full font-bold text-lg transition-all transform active:scale-95 shadow-lg max-w-xs w-full sm:w-auto flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-mumbai-orange to-mumbai-pink text-white hover:shadow-mumbai-pink/50",
    secondary: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
    success: "bg-emerald-500 text-white hover:bg-emerald-600"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
