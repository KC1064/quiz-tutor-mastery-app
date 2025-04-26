
import React from 'react';
import { QuizProvider, useQuiz } from '@/contexts/QuizContext';
import { LandingPage } from '@/components/LandingPage';
import { QuizCard } from '@/components/QuizCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';

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
  const [currentQuizData, setCurrentQuizData] = React.useState(null);

  React.useEffect(() => {
    if (selectedWeek) {
      setCurrentQuizData(quizData[selectedWeek]);
    }
  }, [selectedWeek]);

  const handleReset = () => {
    setSelectedWeek('');
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (!selectedWeek) {
    return <LandingPage quizWeeks={Object.keys(quizData)} />;
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-xl shadow-sm p-6 mb-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-center text-primary">
              {selectedWeek} Quiz
            </h1>
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
        </div>
      </div>
    </div>
  );

  function handleSubmit() {
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
  }
};

const Quiz = () => {
  return (
    <QuizProvider>
      <QuizContent />
    </QuizProvider>
  );
};

export default Quiz;
