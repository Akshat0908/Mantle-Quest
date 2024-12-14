import { motion } from 'framer-motion';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-6">
      <motion.div
        className="w-6 h-6 border-2 border-mantle-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default LoadingSpinner; 