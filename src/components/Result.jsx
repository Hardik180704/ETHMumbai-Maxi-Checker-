import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';
import { Download, RotateCcw, Share2, Ticket } from 'lucide-react';
import Button from './Button';
import MaxiCard from './MaxiCard';
import { getTier } from '../data/tiers';

export default function Result({ scoreData, wallet, onRestart }) {
  const cardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [highScores, setHighScores] = useState([]);

  const tier = getTier(scoreData.percentage);

  // Confetti Effect
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // Leaderboard Logic (Run once on mount/result)
  const savedRef = useRef(false);
  useEffect(() => {
    if (savedRef.current) return;
    savedRef.current = true;
    
    const savedScores = JSON.parse(localStorage.getItem('ethmumbai-scores') || '[]');
    const newEntry = {
      score: scoreData.score,
      date: new Date().toLocaleDateString(),
      tier: tier.name
    };
    
    // Sort and keep top 5
    const newScores = [...savedScores, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
      
    localStorage.setItem('ethmumbai-scores', JSON.stringify(newScores));
    setHighScores(newScores);
  }, [scoreData, tier.name]);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    
    try {
      // Small delay to ensure styles are applied
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(cardRef.current, {
        scale: 5, // Ultra Resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = "ethmumbai-pass-" + scoreData.score + ".png";
      link.click();
    } catch (err) {
      console.error("Failed to generate card", err);
      alert("Oops! Could not generate the card.");
    } finally {
      setIsGenerating(false);
    }
  };

  const shareText = "Kya baat hai! Scored " + scoreData.percentage + "% on the ETHMumbai Maxi Checker. I am officially a " + tier.name + "! 🇮🇳✨\n\nCheck your Web3 Mumbai gyaan here: [Link]"; // Add actual link later
  const shareUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto animate-fade-in pb-12 relative z-20">
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="text-center mb-8"
      >
        <p className="inline-block bg-mumbai-yellow text-black font-bold px-3 py-1 -rotate-2 rounded uppercase tracking-widest text-xs mb-4">
           Exam Result Declared!
        </p>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter">
          <span className={`bg-clip-text text-transparent bg-gradient-to-r ${tier.color}`}>
            {tier.name}
          </span>
        </h1>
        <p className="text-xl text-slate-300">
           Score: {scoreData.score} / {scoreData.total} <span className="text-mumbai-orange">({scoreData.percentage}%)</span>
        </p>

        {/* Vada Pav Index Display */}
        {wallet?.balance && (
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.8 }}
             className="mt-4 bg-white/10 backdrop-blur-md inline-block px-6 py-3 rounded-2xl border border-white/10"
           >
              <p className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-1">Your Vada Pav Power</p>
              <div className="flex items-center gap-2 justify-center">
                 <span className="text-3xl">🍔</span>
                 <span className="text-2xl font-mono font-bold text-mumbai-yellow">
                   {Math.floor((parseFloat(wallet.balance) * 200000) / 20).toLocaleString()} <span className="text-sm text-white/60">Vada Pavs</span>
                 </span>
              </div>
           </motion.div>
        )}
      </motion.div>

      {/* Card Preview Area */}
      <div className="relative mb-8 group perspective-1000">
         <div className="absolute -top-6 -right-6 z-30 animate-bounce">
            <span className="bg-white text-black font-bold px-3 py-1 rounded-full text-xs shadow-lg">New Pass! 🎟️</span>
         </div>

        <motion.div
           initial={{ rotateX: 10, opacity: 0 }}
           animate={{ rotateX: 0, opacity: 1 }}
           transition={{ delay: 0.3 }}
           className="transform-gpu transition-transform duration-500 hover:scale-[1.02]"
        >
          {/* Wrapper to handle responsive scaling of the fixed-size card */}
          <div className="origin-top transform scale-[0.55] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 p-2 border-2 border-white/5 rounded-[2rem]">
             <MaxiCard ref={cardRef} scoreData={scoreData} wallet={wallet} />
          </div>
        </motion.div>
      </div>

     {/* Leaderboard */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-md mb-12 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
      >
        <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
           <span>🏆</span> Hall of Fame
        </h3>
        <div className="space-y-2">
          {highScores.map((s, i) => (
            <div key={i} className="flex justify-between items-center text-slate-300 text-sm border-b border-white/5 last:border-0 pb-2 last:pb-0">
              <span className="flex items-center gap-2">
                 <span className="font-mono opacity-50">#{i+1}</span>
                 {s.tier}
              </span>
              <span className="font-bold text-mumbai-orange">{s.score} pts</span>
            </div>
          ))}
          {highScores.length === 0 && <p className="text-center text-slate-500">No scores yet. Be the first!</p>}
        </div>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4 z-20 -mt-24 sm:-mt-20 md:mt-0">
        <Button onClick={handleDownload} variant="primary">
          <Download className="w-5 h-5" />
          {isGenerating ? "Printing Ticket..." : "Download Pass"}
        </Button>
        
        <a href={shareUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary" className="w-full text-[#1DA1F2] hover:bg-[#1DA1F2]/10">
            <Share2 className="w-5 h-5" />
            Flex on X
          </Button>
        </a>

        <Button onClick={onRestart} variant="secondary">
          <RotateCcw className="w-5 h-5" />
          Retake Quiz
        </Button>
      </div>
    
    </div>
  );
}
