
import React, { createContext, useContext, useState } from 'react';

type QuizContextType = {
  selectedWeek: string;
  setSelectedWeek: (week: string) => void;
  userAnswers: Record<number, string[]>;
  setUserAnswers: React.Dispatch<React.SetStateAction<Record<number, string[]>>>;
  showResults: boolean;
  setShowResults: (show: boolean) => void;
  score: number;
  setScore: (score: number) => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedWeek, setSelectedWeek] = useState('');
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  return (
    <QuizContext.Provider
      value={{
        selectedWeek,
        setSelectedWeek,
        userAnswers,
        setUserAnswers,
        showResults,
        setShowResults,
        score,
        setScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
