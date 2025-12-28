import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { questions } from '../data/questions';

const slangs = ["Bohot Hard!", "Kya Bolti Public?", "Ek Number!", "Kadak!", "Full Power!", "Vibe Hai!", "Scene Set Hai!"];

export default function Quiz({ onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: selectedIndex }
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [toast, setToast] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleOptionSelect = (index) => {
    if (selectedOption !== null) return; // Prevent changing answer
    setSelectedOption(index);
    setShowExplanation(true);
    
    const isCorrect = index === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
      setToast(slangs[Math.floor(Math.random() * slangs.length)]);
    }

    setAnswers(prev => ({ ...prev, [currentQuestion.id]: index }));
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete({
        score: score, 
        percentage: Math.round((score / questions.length) * 100),
        total: questions.length
      });
    } else {
      setSelectedOption(null);
      setShowExplanation(false);
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // Progress as a "Station" Indicator
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 z-20 relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="fixed top-20 left-0 w-full flex justify-center z-50 pointer-events-none"
          >
            <div className="bg-mumbai-orange text-black font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg transform rotate-[-2deg]">
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Local Train Line Progress */}
      <div className="mb-8 relative">
        <div className="flex justify-between text-xs text-slate-500 font-bold uppercase tracking-widest mb-2">
           <span>Churchgate</span>
           <span>Virar</span>
        </div>
        <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden">
          {/* Track Lines */}
          <div className="absolute inset-0 w-full h-full opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,#000_10px,#000_12px)]"></div>
          
          <motion.div 
            className="h-full bg-gradient-to-r from-mumbai-orange to-mumbai-pink relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          >
             {/* Train Head Indicator */}
             <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white rounded-full border-4 border-mumbai-pink shadow-[0_0_10px_rgba(225,0,152,0.8)]"></div>
          </motion.div>
        </div>
        <div className="text-center mt-2 text-mumbai-yellow font-mono text-sm">
           Station: {currentQuestionIndex + 1} / {questions.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl"
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold leading-tight">
              {currentQuestion.text}
            </h2>
            <div className="bg-white/5 p-2 rounded-lg shrink-0">
               <span className="text-2xl">🤔</span>
            </div>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrect = index === currentQuestion.correctIndex;
              const showResult = selectedOption !== null;

              let buttonStyle = "w-full text-left p-4 rounded-xl transition-all border border-white/5 bg-white/5 hover:bg-white/10";
              
              if (showResult) {
                if (isCorrect) {
                  buttonStyle = "w-full text-left p-4 rounded-xl border-2 border-green-500/50 bg-green-500/20 text-green-200 shadow-[0_0_20px_rgba(34,197,94,0.3)]";
                } else if (isSelected) {
                  buttonStyle = "w-full text-left p-4 rounded-xl border-2 border-red-500/50 bg-red-500/20 text-red-200";
                } else {
                  buttonStyle = "w-full text-left p-4 rounded-xl border border-white/5 bg-white/5 opacity-50";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={showResult}
                  className={buttonStyle}
                >
                  <div className="flex items-center">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold ${showResult && isCorrect ? 'bg-green-500 text-black' : 'bg-white/10'}`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-lg font-medium">{option}</span>
                    {showResult && isCorrect && (
                       <span className="ml-auto text-green-400 text-xl">✓</span>
                    )}
                    {showResult && isSelected && !isCorrect && (
                       <span className="ml-auto text-red-400 text-xl">✗</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation & Next Button */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="overflow-hidden mt-6 pt-6 border-t border-white/10"
              >
                <div className="bg-mumbai-sky/10 border border-mumbai-sky/20 p-4 rounded-xl mb-6">
                  <p className="text-mumbai-sky text-sm">
                    <span className="font-bold block mb-1 uppercase tracking-wider">💡 Gyaan (Knowledge)</span>
                    {currentQuestion.explanation}
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleNext} className="bg-gradient-to-r from-mumbai-orange to-mumbai-pink hover:from-mumbai-pink hover:to-mumbai-orange">
                    {isLastQuestion ? "Finish Quiz" : "Pudhe Chala (Next) →"}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
