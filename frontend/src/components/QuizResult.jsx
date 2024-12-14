import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';
import confetti from 'canvas-confetti';

function QuizResult({ score, totalQuestions, difficulty }) {
  const navigate = useNavigate();
  const { dispatch } = useQuiz();
  const [isLoading, setIsLoading] = useState(false);
  const percentage = Math.round((score / totalQuestions) * 100);

  // Trigger confetti for high scores
  React.useEffect(() => {
    if (percentage >= 80) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [percentage]);

  const handleTryAgain = () => {
    setIsLoading(true);
    dispatch({ type: 'RESET_QUIZ' });
    navigate('/quiz');
  };

  const getGrade = () => {
    if (percentage >= 90) return { label: 'Outstanding!', emoji: '🏆', color: 'text-yellow-500' };
    if (percentage >= 80) return { label: 'Excellent!', emoji: '🌟', color: 'text-green-500' };
    if (percentage >= 70) return { label: 'Great Job!', emoji: '👏', color: 'text-blue-500' };
    if (percentage >= 60) return { label: 'Good Try!', emoji: '💪', color: 'text-indigo-500' };
    return { label: 'Keep Learning!', emoji: '📚', color: 'text-purple-500' };
  };

  const grade = getGrade();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-12"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-mantle-primary to-mantle-secondary p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-6xl mb-4"
            >
              {grade.emoji}
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
            <p className="text-white/80">You've finished the {difficulty.toLowerCase()} level quiz</p>
          </div>

          {/* Score Display */}
          <div className="p-8">
            <div className="flex justify-center items-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <svg className="w-32 h-32">
                  <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="64"
                    cy="64"
                  />
                  <motion.circle
                    className="text-mantle-primary"
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="64"
                    cy="64"
                    initial={{ strokeDasharray: "364 364", strokeDashoffset: 364 }}
                    animate={{ strokeDashoffset: 364 - (364 * percentage) / 100 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-3xl font-bold text-gray-700">{percentage}%</div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mb-8"
            >
              <h3 className={`text-2xl font-bold mb-2 ${grade.color}`}>{grade.label}</h3>
              <p className="text-gray-600">
                You got <span className="font-semibold">{score}</span> out of{' '}
                <span className="font-semibold">{totalQuestions}</span> questions correct
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
              <button
                onClick={() => navigate('/profile')}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-mantle-primary to-mantle-secondary text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                View Your Profile
              </button>
              
              <button
                onClick={handleTryAgain}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Try Another Quiz
              </button>

              <button
                onClick={() => navigate('/')}
                disabled={isLoading}
                className="w-full text-gray-600 hover:text-gray-800 transition-colors"
              >
                Back to Home
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Achievement Badge */}
        {percentage >= 80 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center"
          >
            <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
              🎉 Achievement Unlocked: {difficulty} Master!
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default QuizResult; 