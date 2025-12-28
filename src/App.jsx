import { useState } from 'react';
import Layout from './components/Layout';
import Landing from './components/Landing';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { AnimatePresence } from 'framer-motion';
import { useWallet } from './hooks/useWallet';

function App() {
  const [gameState, setGameState] = useState('landing'); // landing, quiz, result
  const [scoreData, setScoreData] = useState(null);
  const wallet = useWallet();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {gameState === 'landing' && (
          <Landing 
            key="landing" 
            onStart={() => setGameState('quiz')} 
            wallet={wallet}
          />
        )}
        
        {gameState === 'quiz' && (
          <Quiz key="quiz" onComplete={(result) => {
            setScoreData(result);
            setGameState('result');
          }} />
        )}

        {gameState === 'result' && scoreData && (
          <Result 
            key="result" 
            scoreData={scoreData} 
            wallet={wallet}
            onRestart={() => {
              setScoreData(null);
              setGameState('landing');
            }}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
}


export default App;
