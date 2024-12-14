import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useQuiz } from '../contexts/QuizContext';
import { useQuizContract } from '../hooks/useQuizContract';
import { quizQuestions } from '../data/quizQuestions';
import LoadingSpinner from '../components/LoadingSpinner';
import QuizQuestion from '../components/QuizQuestion';
import QuizResult from '../components/QuizResult';
import QuizResponse from '../components/QuizResponse';
import TransactionStatus from '../components/TransactionStatus';
import { motion, AnimatePresence } from 'framer-motion';

function Quiz() {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { state, dispatch } = useQuiz();
  const { startQuiz, completeQuiz, activeSession, checkSession } = useQuizContract();
  const [showResponse, setShowResponse] = useState(false);
  const [lastAnswer, setLastAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionType, setTransactionType] = useState(null);

  console.log('Quiz State:', state);
  console.log('Active Session:', activeSession);

  // Redirect if not connected
  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  // Timer effect
  useEffect(() => {
    let timer;
    if (state.isActive && state.timeLeft > 0) {
      timer = setInterval(() => {
        dispatch({ type: 'UPDATE_TIME' });
      }, 1000);
    } else if (state.timeLeft === 0) {
      handleQuizEnd();
    }
    return () => clearInterval(timer);
  }, [state.isActive, state.timeLeft]);

  // Check session periodically
  useEffect(() => {
    let interval;
    if (state.isActive) {
      interval = setInterval(async () => {
        const isActive = await checkSession();
        if (!isActive) {
          alert('Quiz session has expired');
          dispatch({ type: 'RESET_QUIZ' });
          navigate('/quiz');
        }
      }, 10000); // Check every 10 seconds
    }
    return () => clearInterval(interval);
  }, [state.isActive]);

  const handleDifficultySelect = async (difficulty) => {
    try {
      setIsLoading(true);
      setTransactionType('start');
      
      const difficultyMap = {
        BEGINNER: 0,
        INTERMEDIATE: 1,
        ADVANCED: 2
      };

      const difficultyValue = difficultyMap[difficulty];

      if (typeof difficultyValue !== 'number') {
        throw new Error(`Invalid difficulty level: ${difficulty}`);
      }

      // Start quiz and wait for confirmation
      const result = await startQuiz(difficultyValue);
      if (result) {
        dispatch({ type: 'START_QUIZ', payload: difficulty });
        setIsLoading(false);
        setTransactionType(null);
      }

    } catch (error) {
      const errorMessage = error.message.includes('user rejected')
        ? 'Please confirm the transaction in your wallet'
        : error.message.includes('session')
          ? 'Failed to start quiz session. Please try again.'
          : `Failed to start quiz: ${error.message}`;
      alert(errorMessage);
      setIsLoading(false);
      setTransactionType(null);
    }
  };

  const handleAnswer = async (selectedAnswer) => {
    try {
      const currentQuestion = quizQuestions[state.difficulty][state.currentQuestion];
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

      setLastAnswer({
        isCorrect,
        explanation: currentQuestion.explanation
      });
      setShowResponse(true);

      dispatch({
        type: 'ANSWER_QUESTION',
        payload: { questionId: currentQuestion.id, answer: selectedAnswer, isCorrect },
      });
    } catch (error) {
      console.error('Error handling answer:', error);
      alert('Failed to process answer. Please try again.');
    }
  };

  const handleNextQuestion = async () => {
    setShowResponse(false);
    if (state.currentQuestion + 1 >= quizQuestions[state.difficulty].length) {
      await handleQuizEnd();
    }
  };

  const handleQuizEnd = async () => {
    try {
      setIsLoading(true);
      setTransactionType('complete');
      
      const finalScore = Math.round((state.score / quizQuestions[state.difficulty].length) * 100);
      
      // Check if session is active before completing
      if (!activeSession?.isActive) {
        throw new Error('Quiz session has expired or is not active');
      }

      // Wait for transaction to be confirmed
      await completeQuiz(finalScore);
      
      // Only end quiz after transaction is confirmed
      setTimeout(() => {
        dispatch({ type: 'END_QUIZ' });
        navigate('/profile');
        setIsLoading(false);
        setTransactionType(null);
      }, 1000);
    } catch (error) {
      console.error('Error completing quiz:', error);
      // Handle specific error cases
      const errorMessage = error.message.includes('No active quiz session')
        ? 'Quiz session has expired. Please try again.'
        : error.message.includes('user rejected')
          ? 'Please confirm the transaction in your wallet'
          : `Failed to complete quiz: ${error.message}`;
      alert(errorMessage);
      setIsLoading(false);
      setTransactionType(null);
      // If session expired, reset and redirect
      if (error.message.includes('No active quiz session')) {
        dispatch({ type: 'RESET_QUIZ' });
        navigate('/quiz');
      }
    }
  };

  if (!quizQuestions || !state) {
    return <LoadingSpinner />;
  }

  if (!state.difficulty) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold mb-4 text-gray-800"
          >
            Choose Your Challenge
          </motion.h2>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 mb-12"
          >
            Select the difficulty level that matches your Web3 expertise
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                level: 'BEGINNER',
                icon: '🌱',
                title: 'Beginner',
                description: 'Perfect for those new to Web3',
                color: 'from-green-400 to-green-500',
                hoverColor: 'group-hover:from-green-500 group-hover:to-green-600'
              },
              {
                level: 'INTERMEDIATE',
                icon: '⚡',
                title: 'Intermediate',
                description: 'For those familiar with Web3',
                color: 'from-blue-400 to-blue-500',
                hoverColor: 'group-hover:from-blue-500 group-hover:to-blue-600'
              },
              {
                level: 'ADVANCED',
                icon: '🚀',
                title: 'Advanced',
                description: 'For Web3 experts',
                color: 'from-purple-400 to-purple-500',
                hoverColor: 'group-hover:from-purple-500 group-hover:to-purple-600'
              }
            ].map(({ level, icon, title, description, color, hoverColor }) => (
              <motion.button
                key={level}
                onClick={() => handleDifficultySelect(level)}
                disabled={isLoading}
                className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-1'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'].indexOf(level) * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${color} ${hoverColor} transition-all duration-300`} />
                <div className="relative p-6 text-white">
                  <div className="text-4xl mb-4">{icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{title}</h3>
                  <p className="text-white/90 mb-4">{description}</p>
                  {isLoading && (
                    <div className="mt-4">
                      <div className="flex justify-center">
                        <LoadingSpinner />
                      </div>
                      <p className="text-sm text-white/80 mt-2">
                        {isLoading ? 'Starting quiz...' : 'Please confirm in wallet...'}
                      </p>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 group-hover:bg-white/30 transition-colors" />
                </div>
              </motion.button>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-gray-600 text-sm"
          >
            Each difficulty level offers different challenges and rewards
          </motion.p>
        </div>
      </motion.div>
    );
  }

  const questions = quizQuestions[state.difficulty];
  const currentQuestionData = questions[state.currentQuestion];

  if (!currentQuestionData) {
    return (
      <QuizResult
        score={state.score}
        totalQuestions={questions.length}
        difficulty={state.difficulty}
      />
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <QuizQuestion
            key={state.currentQuestion}
            question={currentQuestionData.question}
            options={currentQuestionData.options}
            onAnswer={handleAnswer}
            questionNumber={state.currentQuestion + 1}
            totalQuestions={questions.length}
            timeLeft={state.timeLeft}
          />
        </AnimatePresence>
        {showResponse && lastAnswer && (
          <QuizResponse
            isCorrect={lastAnswer.isCorrect}
            explanation={lastAnswer.explanation}
            onNext={handleNextQuestion}
          />
        )}
      </div>
      <AnimatePresence>
        {isLoading && (
          <TransactionStatus
            type={transactionType}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Quiz; 