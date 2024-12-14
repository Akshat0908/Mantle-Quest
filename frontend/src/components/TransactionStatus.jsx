import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

function TransactionStatus({ type, isLoading }) {
  const messages = {
    start: {
      title: 'Starting Quiz',
      steps: [
        { label: 'Initializing quiz session...', delay: 0 },
        { label: 'Setting difficulty level...', delay: 0.2 },
        { label: 'Please confirm transaction in wallet', delay: 0.4 },
      ]
    },
    complete: {
      title: 'Completing Quiz',
      steps: [
        { label: 'Calculating final score...', delay: 0 },
        { label: 'Submitting results...', delay: 0.2 },
        { label: 'Please confirm transaction in wallet', delay: 0.4 },
      ]
    }
  };

  const currentMessage = messages[type];

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
        <div className="text-center">
          <LoadingSpinner />
          <h3 className="text-xl font-bold mt-4 mb-6">{currentMessage.title}</h3>
          <div className="space-y-4">
            {currentMessage.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: step.delay }}
                className="text-gray-600"
              >
                {step.label}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TransactionStatus; 