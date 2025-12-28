export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-mumbai-pink selection:text-white overflow-x-hidden relative">
      
      {/* Kaali-Peeli Taxi Pattern Top Border */}
      <div className="fixed top-0 left-0 w-full h-2 z-50 bg-pattern-taxi opacity-80"></div>

      {/* Header Logo */}
      <div className="fixed top-6 left-6 z-40">
        <img src="/ethmumbai-logo.png" alt="ETHMumbai Logo" className="w-16 h-16 drop-shadow-lg hover:scale-110 transition-transform" />
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
