import React from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

function LoadingOverlay({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg p-6 text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </motion.div>
  );
}

export default LoadingOverlay; 