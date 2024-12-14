import React, { createContext, useContext, useReducer } from 'react';

const QuizContext = createContext();

const initialState = {
  isActive: false,
  difficulty: null,
  currentQuestion: 0,
  score: 0,
  timeLeft: 600, // 10 minutes
  answers: [],
};

function quizReducer(state, action) {
  console.log('Quiz state update:', { currentState: state, action });

  switch (action.type) {
    case 'START_QUIZ':
      return {
        ...initialState,
        isActive: true,
        difficulty: action.payload,
        timeLeft: 600, // Reset timer
      };
    case 'ANSWER_QUESTION':
      const newScore = action.payload.isCorrect ? state.score + 1 : state.score;
      console.log('Updating score:', { oldScore: state.score, newScore });
      return {
        ...state,
        answers: [...state.answers, action.payload],
        currentQuestion: state.currentQuestion + 1,
        score: newScore,
      };
    case 'UPDATE_TIME':
      return {
        ...state,
        timeLeft: Math.max(0, state.timeLeft - 1),
      };
    case 'END_QUIZ':
      return {
        ...state,
        isActive: false,
        timeLeft: 0,
      };
    case 'SESSION_EXPIRED':
      return {
        ...initialState,
      };
    case 'RESET_QUIZ':
      return {
        ...initialState,
        timeLeft: 600,
      };
    default:
      return state;
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Debug log
  console.log('QuizProvider State:', state);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
} 