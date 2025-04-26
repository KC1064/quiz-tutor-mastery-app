
import React, { useState } from 'react';
import { QuizProvider } from '@/contexts/QuizContext';
import { WeekSelector } from '@/components/WeekSelector';
import { QuizCard } from '@/components/QuizCard';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import { useToast } from '@/components/ui/use-toast';

// This would normally come from an API
const quizData = {
  "Week 1": [
    {
      question: "What is React?",
      options: {
        "A": "A JavaScript library for building user interfaces",
        "B": "A programming language",
        "C": "A database system",
        "D": "An operating system"
      },
      answer: "A"
    },
    {
      question: "What is JSX?",
      options: {
        "A": "A JavaScript engine",
        "B": "A syntax extension for JavaScript",
        "C": "A new programming language",
        "D": "A database query language"
      },
      answer: "B"
    }
  ]
};

const QuizContent = () => {
  const { toast } = useToast();
  const {
    selectedWeek,
    setSelectedWeek,
    userAnswers,
    setUserAnswers,
    showResults,
    setShowResults,
    score,
    setScore
  } = useQuiz();
  const [currentQuizData, setCurrentQuizData] = useState(null);

  const weeks = Object.keys(quizData);

  const handleWeekSelect = (week: string) => {
    setSelectedWeek(week);
    if (week) {
      setCurrentQuizData(quizData[week]);
      setUserAnswers({});
      setShowResults(false);
      setScore(0);
    } else {
      setCurrentQuizData(null);
    }
  };

  const handleSubmit = () => {
    if (!currentQuizData) return;

    let correctCount = 0;
    currentQuizData.forEach((question, index) => {
      const correctAnswers = question.answers || [question.answer];
      const userSelectedAnswers = userAnswers[index] || [];
      
      const isCorrect = 
        correctAnswers.length === userSelectedAnswers.length && 
        correctAnswers.every(answer => userSelectedAnswers.includes(answer));
      
      if (isCorrect) correctCount++;
    });

    setScore(correctCount);
    setShowResults(true);
    
    toast({
      title: "Quiz Completed!",
      description: `You scored ${correctCount} out of ${currentQuizData.length}`,
    });
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
            Weekly Quiz
          </h1>
          <WeekSelector weeks={weeks} onWeekSelect={handleWeekSelect} />
        </div>

        {currentQuizData && !showResults && (
          <>
            {currentQuizData.map((question, index) => (
              <QuizCard
                key={index}
                question={question}
                questionIndex={index}
              />
            ))}
            
            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleSubmit}
                className="px-8"
              >
                Submit Quiz
              </Button>
            </div>
          </>
        )}

        {showResults && (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Your Results</h2>
            <p className="text-4xl font-bold mb-6">
              {score} / {currentQuizData.length}
              <span className="text-gray-500 text-2xl ml-2">
                ({Math.round((score / currentQuizData.length) * 100)}%)
              </span>
            </p>
            <Button 
              onClick={handleReset}
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        )}

        {!selectedWeek && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-600 text-lg">
              Please select a week to start the quiz
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const Quiz = () => {
  return (
    <QuizProvider>
      <QuizContent />
    </QuizProvider>
  );
};

export default Quiz;
