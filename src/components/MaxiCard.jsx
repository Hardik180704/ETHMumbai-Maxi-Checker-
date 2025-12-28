import { forwardRef } from 'react';
import { getTier } from '../data/tiers';

const MaxiCard = forwardRef(({ scoreData, wallet }, ref) => {
  const { percentage, score, total } = scoreData;
  const tier = getTier(percentage);
  const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  
  const userName = wallet?.ensName || (wallet?.account ? wallet.account.slice(0, 6) + "..." + wallet.account.slice(-4) : "Anon Maxi");
  
  // Vada Pav Logic
  const ethPrice = 200000; // Mock price INR
  const vadaPavPrice = 20;
  const vadaPavCount = wallet?.balance ? Math.floor((parseFloat(wallet.balance) * ethPrice) / vadaPavPrice) : 0;
  
  const isWhale = wallet?.balance && parseFloat(wallet.balance) > 1.0;
  const isStudent = wallet?.balance && parseFloat(wallet.balance) < 0.01;

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

      {/* STAMPS - blend modes removed for export stability */}
      {isWhale && (
        <div className="absolute top-1/2 right-8 -translate-y-1/2 z-20 opacity-90 pointer-events-none">
          <div className="border-[6px] border-white rounded-full w-32 h-32 flex items-center justify-center -rotate-12 bg-white/10 backdrop-blur-md shadow-2xl">
             <div className="text-center">
               <span className="block text-4xl">🐋</span>
               <span className="block text-[10px] font-black uppercase tracking-widest mt-1 text-white">SoBo Whale</span>
             </div>
          </div>
        </div>
      )}

      {isStudent && (
        <div className="absolute top-1/2 right-8 -translate-y-1/2 z-20 opacity-90 pointer-events-none">
          <div className="border-[4px] border-white/50 rounded-lg w-32 h-20 flex items-center justify-center rotate-6 bg-red-500/40 backdrop-blur-sm shadow-xl">
             <div className="text-center text-white">
               <span className="block text-2xl">🎒</span>
               <span className="block text-[10px] font-bold uppercase tracking-wide">Student Pass</span>
             </div>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full h-full bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/20 p-8 flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <img src="/ethmumbai-logo.png" alt="Logo" className="w-12 h-12 object-contain" />
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase opacity-80 text-white">ETHMumbai 2024</h3>
              <h1 className="text-3xl font-black tracking-tighter mt-1 text-white drop-shadow-md">
                Maxi Checker
              </h1>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              <span className="text-xl font-bold font-mono text-white">{score}/{total}</span>
            </div>
             {wallet?.account && (
               <div className="text-[10px] font-mono text-green-300 bg-green-900/60 px-2 py-0.5 rounded-full border border-green-500/30 uppercase tracking-wider shadow-sm">
                 ● Verified
               </div>
             )}
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <div className="text-5xl md:text-6xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-tight">
            {tier.name}
          </div>
          <p className="text-slate-200 mt-2 font-medium italic max-w-sm">"{tier.description}"</p>
          
          {wallet?.balance && (
            <div className="mt-4 px-4 py-1 bg-black/30 rounded-full border border-white/10 flex items-center gap-2">
              <span className="text-lg">🍔</span>
              <span className="text-xs uppercase tracking-widest font-bold text-mumbai-orange">Purchasing Power:</span>
              <span className="text-sm font-mono font-bold">{vadaPavCount.toLocaleString()} VPs</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end border-t border-white/10 pt-4">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wider opacity-60">Holder Name</span>
            <span className="font-bold text-lg truncate max-w-[200px]">{userName}</span>
          </div>
          
          <div className="flex flex-col items-end">
             <span className="text-xs uppercase tracking-wider opacity-60">Date Issued</span>
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
