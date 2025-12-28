export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-mumbai-pink selection:text-white overflow-x-hidden relative">
      
      {/* Kaali-Peeli Taxi Pattern Top Border */}
      <div className="fixed top-0 left-0 w-full h-2 z-50 bg-pattern-taxi opacity-80"></div>

      {/* Header Logo */}
      {/* Header Logo */}
      <div className="fixed top-4 left-4 md:top-6 md:left-6 z-40 p-2 bg-slate-900/40 backdrop-blur-md border border-mumbai-yellow/30 rounded-2xl shadow-[0_0_15px_rgba(255,204,0,0.2)] hover:border-mumbai-yellow/60 hover:shadow-mumbai-yellow/20 transition-all duration-300 group">
        <img src="/ethmumbai-logo.png" alt="ETHMumbai Logo" className="w-10 h-10 md:w-14 md:h-14 object-contain group-hover:scale-105 transition-transform" />
      </div>

      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-[#240046] via-[#10002b] to-[#240046] z-0 pointer-events-none"></div>
      
      <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        {children}
      </main>
      
      <footer className="relative z-10 w-full text-center py-6 text-slate-500 text-sm font-medium">
        <p className="flex items-center justify-center gap-2">
          Made with <span className="text-mumbai-orange animate-pulse">Vada Pav</span> & Code for ETHMumbai
        </p>
      </footer>
    </div>
  );
}
