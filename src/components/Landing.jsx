import { motion } from 'framer-motion';
import { Train, Wallet, ArrowRight } from 'lucide-react';
import Button from './Button';

export default function Landing({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] w-full max-w-6xl mx-auto px-4 relative z-20">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        
        {/* Left Content */}
        <div className="text-center md:text-left space-y-8 order-2 md:order-1">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-mumbai-orange/10 backdrop-blur-md px-4 py-2 rounded-full border border-mumbai-orange/20 text-mumbai-orange font-bold text-sm tracking-wide uppercase"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mumbai-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-mumbai-orange"></span>
            </span>
            ETHMumbai 2024 Edition
          </motion.div>

          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black leading-tight tracking-tight"
          >
            <span className="text-white drop-shadow-lg">Aamchi</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mumbai-orange via-mumbai-pink to-purple-600">
              Web3 Mumbai
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 max-w-lg mx-auto md:mx-0 leading-relaxed"
          >
            From Local Trains to L2 Chains. Test your knowledge of the city that never sleep and the builders who never stop shipping.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4"
          >
            <Button onClick={onStart} variant="primary" className="shadow-mumbai-pink/25 shadow-xl">
              <Train className="w-5 h-5" />
              Start The Journey
            </Button>
            <Button variant="secondary" onClick={() => alert("Wallet connection coming soon!")}>
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center md:justify-start gap-8 text-slate-500 text-xs font-bold uppercase tracking-widest pt-8"
          >
             <div className="flex items-center gap-2">
               <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
               15 Questions
             </div>
             <div className="flex items-center gap-2">
               <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
               5 Maxi Tiers
             </div>
             <div className="flex items-center gap-2">
               <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
               POAP Rewards
             </div>
          </motion.div>
        </div>

        {/* Right Hero Image */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="order-1 md:order-2 relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <img 
              src="/mumbai-hero.jpg" 
              alt="ETHMumbai Hero Art" 
              className="w-full h-auto object-cover"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
          </div>

          {/* Decorative Backdrops */}
          <div className="absolute -inset-4 bg-gradient-to-r from-mumbai-orange to-mumbai-pink rounded-3xl blur-2xl opacity-30 -z-10"></div>
          
        </motion.div>

      </div>
    </div>
  );
}
