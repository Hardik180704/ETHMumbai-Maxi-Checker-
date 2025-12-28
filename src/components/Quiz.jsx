import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { questions } from '../data/questions';

export default function Quiz({ onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: selectedIndex }
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleOptionSelect = (index) => {
    if (selectedOption !== null) return; // Prevent changing answer
    setSelectedOption(index);
    setShowExplanation(true);
    
    // Calculate score immediately or store for later? 
    // Let's store answer and calculate at end or incrementally.
    const isCorrect = index === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setAnswers(prev => ({ ...prev, [currentQuestion.id]: index }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const finalScorePercentage = Math.round(((score + (selectedOption === currentQuestion.correctIndex ? 0 : 0)) / questions.length) * 100); 
      // Note: Score state is already updated in handleOptionSelect, so we just pass the current state score.
      // Wait, let's be careful. setScore is async. 
      // safer to just recalculate strictly from answers object if we wanted to be pure, but state is fine if we wait.
      // Actually, since we are moving to "next" AFTER the user sees the result, score is stable.
      
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

  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 z-20 relative">
      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-2 rounded-full mb-8 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-mumbai-orange to-mumbai-pink"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="mb-4 flex justifying-between items-center text-slate-400 text-sm font-semibold uppercase tracking-wider">
        <span>Question {currentQuestionIndex + 1} / {questions.length}</span>
        <span className="ml-auto">Score: {score}</span>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
            {currentQuestion.text}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrect = index === currentQuestion.correctIndex;
              const showResult = selectedOption !== null;

              let buttonStyle = "w-full text-left p-4 rounded-xl transition-all border border-white/5 bg-white/5 hover:bg-white/10";
              
              if (showResult) {
                if (isCorrect) {
                  buttonStyle = "w-full text-left p-4 rounded-xl border border-green-500/50 bg-green-500/20 text-green-200";
                } else if (isSelected) {
                  buttonStyle = "w-full text-left p-4 rounded-xl border border-red-500/50 bg-red-500/20 text-red-200";
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
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-4 text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-lg">{option}</span>
                    {showResult && isCorrect && (
                       <span className="ml-auto text-green-400">✓</span>
                    )}
                    {showResult && isSelected && !isCorrect && (
                       <span className="ml-auto text-red-400">✗</span>
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
                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl mb-6">
                  <p className="text-blue-200 text-sm">
                    <span className="font-bold block mb-1">💡 Did you know?</span>
                    {currentQuestion.explanation}
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleNext}>
                    {isLastQuestion ? "Finish Quiz" : "Next Question →"}
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
