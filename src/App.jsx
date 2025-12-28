import { useState } from 'react';
import Layout from './components/Layout';
import Landing from './components/Landing';
import Quiz from './components/Quiz';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [gameState, setGameState] = useState('landing'); // landing, quiz, result
  const [scoreData, setScoreData] = useState(null);


  return (
    <Layout>
      <AnimatePresence mode="wait">
        {gameState === 'landing' && (
          <Landing key="landing" onStart={() => setGameState('quiz')} />
        )}
        
        {gameState === 'quiz' && (
          <Quiz key="quiz" onComplete={(result) => {
            setScoreData(result);
            setGameState('result');
          }} />
        )}

        {gameState === 'result' && (
          <div key="result" className="text-center">
             {/* Placeholder for Result Component */}
            <h2 className="text-4xl">Result Screen</h2>
            <button 
              onClick={() => setGameState('landing')}
              className="mt-4 px-4 py-2 bg-white/10 rounded"
            >
              Restart
            </button>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

export default App;
