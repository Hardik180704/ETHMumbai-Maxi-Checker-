import { forwardRef } from 'react';
import { getTier } from '../data/tiers';

const MaxiCard = forwardRef(({ scoreData, userName = "Anon" }, ref) => {
  const { percentage, score, total } = scoreData;
  const tier = getTier(percentage);
  const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div 
      ref={ref}
      id="maxi-card"
      className={`relative w-[600px] h-[315px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${tier.color} p-1 text-white select-none`}
      style={{
        aspectRatio: '1200/630' 
      }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0"></div>
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay z-0 pointer-events-none"></div>

      <div className="relative z-10 w-full h-full bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/20 p-8 flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase opacity-70">ETHMumbai 2024</h3>
            <h1 className="text-3xl font-black tracking-tighter mt-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Maxi Checker
            </h1>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
            <span className="text-xl font-bold font-mono">{score}/{total}</span>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <div className={`text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${tier.color} drop-shadow-2xl`}>
            {tier.name}
          </div>
          <p className="text-slate-200 mt-2 font-medium italic max-w-sm">"{tier.description}"</p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end border-t border-white/10 pt-4">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wider opacity-60">Verified User</span>
            <span className="font-bold text-lg truncate max-w-[200px]">{userName}</span>
          </div>
          
          <div className="flex flex-col items-end">
             <span className="text-xs uppercase tracking-wider opacity-60">Date</span>
             <span className="font-bold">{date}</span>
          </div>
        </div>

      </div>
      
      {/* Decorative Elements */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none"></div>

    </div>
  );
});

MaxiCard.displayName = "MaxiCard";

export default MaxiCard;
