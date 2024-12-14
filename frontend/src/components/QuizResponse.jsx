import React from 'react';
import { motion } from 'framer-motion';

function QuizResponse({ isCorrect, explanation, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 px-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        <div className={`p-6 ${
          isCorrect ? 'bg-green-500' : 'bg-red-500'
        }`}>
          <div className="text-center">
            <div className="text-6xl mb-2">
              {isCorrect ? '🎉' : '😔'}
            </div>
            <h3 className="text-2xl font-bold text-white">
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </h3>
          </div>
        </div>

        <div className="p-6">
          <div className="prose prose-lg mb-6">
            <p className="text-gray-700">{explanation}</p>
          </div>

          <button
            onClick={onNext}
            className="w-full bg-gradient-to-r from-mantle-primary to-mantle-secondary text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-mantle-primary focus:ring-opacity-50"
          >
            Next Question
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default QuizResponse; 