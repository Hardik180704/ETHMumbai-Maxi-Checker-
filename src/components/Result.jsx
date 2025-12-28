import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { Download, RotateCcw, Share2 } from 'lucide-react';
import Button from './Button';
import MaxiCard from './MaxiCard';
import { getTier } from '../data/tiers';

export default function Result({ scoreData, onRestart }) {
  const cardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const tier = getTier(scoreData.percentage);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    
    try {
      // Small delay to ensure styles are applied
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // High resolution
        backgroundColor: null,
        useCORS: true,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = `ethmumbai-maxi-${scoreData.score}.png`;
      link.click();
    } catch (err) {
      console.error("Failed to generate card", err);
      alert("Oops! Could not generate the card.");
    } finally {
      setIsGenerating(false);
    }
  };

  const shareText = `I just scored ${scoreData.percentage}% on the ETHMumbai Maxi Checker and got the rank: ${tier.name}! 🚀\n\nAre you a Tourist or a Maxi God? Check it out! #ETHMumbai #Web3`;
  const shareUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto animate-fade-in pb-12">
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="text-center mb-8"
      >
        <p className="text-slate-400 uppercase tracking-widest font-bold mb-2">Quiz Complete</p>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
          <span className={`bg-clip-text text-transparent bg-gradient-to-r ${tier.color}`}>
            {tier.name}
          </span>
        </h1>
        <p className="text-xl text-slate-300">You scored {scoreData.score} / {scoreData.total} ({scoreData.percentage}%)</p>
      </motion.div>

      {/* Card Preview Area */}
      {/* We need to render the card for scale, but maybe scale it down for mobile view visually, 
          but keep original size for html2canvas. 
          Trick: Render it hidden or just scale with CSS transform.
      */}
      <div className="relative mb-8 group perspective-1000">
        <motion.div
           initial={{ rotateX: 10, opacity: 0 }}
           animate={{ rotateX: 0, opacity: 1 }}
           transition={{ delay: 0.3 }}
           className="transform-gpu transition-transform duration-500 hover:scale-[1.02]"
        >
          {/* Wrapper to handle responsive scaling of the fixed-size card */}
          <div className="origin-top transform scale-[0.55] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 p-2 border-2 border-white/5 rounded-[2rem]">
             <MaxiCard ref={cardRef} scoreData={scoreData} />
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 z-20 -mt-24 sm:-mt-20 md:mt-0">
        <Button onClick={handleDownload} variant="primary">
          <Download className="w-5 h-5" />
          {isGenerating ? "Minting..." : "Download Card"}
        </Button>
        
        <a href={shareUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary" className="w-full">
            <Share2 className="w-5 h-5" />
            Share on X
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
