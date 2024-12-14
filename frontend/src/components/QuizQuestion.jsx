import { motion, AnimatePresence } from 'framer-motion';

function QuizQuestion({ question, options, onAnswer, questionNumber, totalQuestions, timeLeft }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto"
    >
      {/* Progress and Timer */}
      <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-lg font-semibold">
              Question {questionNumber}/{totalQuestions}
            </span>
            <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-mantle-primary to-mantle-secondary"
                initial={{ width: 0 }}
                animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
          <motion.div
            className={`text-lg font-medium px-4 py-2 rounded-full ${
              timeLeft < 60 ? 'bg-red-100 text-red-600' : 
              timeLeft < 180 ? 'bg-yellow-100 text-yellow-600' : 
              'bg-green-100 text-green-600'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </motion.div>
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gradient-to-r from-mantle-primary to-mantle-secondary p-6">
          <motion.h3
            className="text-xl font-semibold text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {question}
          </motion.h3>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-4">
            {options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => onAnswer(index)}
                className="group relative overflow-hidden text-left p-4 border-2 border-gray-200 rounded-lg hover:border-mantle-primary transition-all transform hover:scale-[1.01]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-mantle-primary to-mantle-secondary opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-mantle-primary font-semibold group-hover:bg-mantle-primary group-hover:text-white transition-colors">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-gray-700 group-hover:text-gray-900">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default QuizQuestion; 