import { motion } from 'framer-motion';
import { Train, Wallet } from 'lucide-react';
import Button from './Button';

export default function Landing({ onStart }) {
  return (
    <div className="flex flex-col items-center text-center space-y-8 max-w-2xl animate-fade-in relative z-20">
      
      {/* Hero Badge */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="inline-block bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-mumbai-orange font-semibold text-sm mb-4"
      >
        🌟 The Ultimate Ethereum Mumbai Quiz
      </motion.div>

      {/* Main Title */}
      <motion.h1 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-mumbai-orange via-mumbai-pink to-mumbai-yellow tracking-tight"
      >
        ETHMumbai <br/>
        <span className="text-white">Maxi Checker</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-slate-300 px-4"
      >
        Are you a tourist, a builder, or a certified <b>Maxi God</b>? <br/>
        Test your knowledge of Ethereum, Mumbai, and the local ecosystem.
      </motion.p>

      {/* Interactive Elements */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-8"
      >
        <Button onClick={onStart} variant="primary">
          <Train className="w-5 h-5" />
          Start Quiz
        </Button>
        <Button variant="secondary" onClick={() => alert("Wallet connection coming soon!")}>
          <Wallet className="w-5 h-5" />
          Connect Wallet (+10 XP)
        </Button>
      </motion.div>

      {/* Stats / Social Proof */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-3 gap-8 pt-12 text-slate-500 text-sm font-medium"
      >
        <div>
          <span className="block text-2xl font-bold text-white">15</span>
          Questions
        </div>
        <div>
          <span className="block text-2xl font-bold text-white">5</span>
          Tiers
        </div>
        <div>
          <span className="block text-2xl font-bold text-white">∞</span>
          Vibes
        </div>
      </motion.div>

    </div>
  );
}
