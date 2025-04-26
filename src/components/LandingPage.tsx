
import React from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { motion } from 'framer-motion';
import { WeekSelector } from './WeekSelector';

type LandingPageProps = {
  quizWeeks?: string[];
};

export const LandingPage: React.FC<LandingPageProps> = ({ quizWeeks = [] }) => {
  const { selectedWeek, setSelectedWeek } = useQuiz();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-background flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full">
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl shadow-lg p-8 border border-border"
        >
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Weekly Quiz
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Test your knowledge by selecting a week to begin.
          </p>
          <WeekSelector 
            weeks={quizWeeks}
            onWeekSelect={setSelectedWeek}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
