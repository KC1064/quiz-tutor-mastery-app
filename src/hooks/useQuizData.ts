
import { useQuery } from '@tanstack/react-query';

export type QuizQuestion = {
  question: string;
  options: Record<string, string>;
  answer: string;
};

export type QuizData = Record<string, QuizQuestion[]>;

const fetchQuizData = async (): Promise<QuizData> => {
  const response = await fetch('/quizData.json');
  if (!response.ok) {
    throw new Error('Failed to fetch quiz data');
  }
  return response.json();
};

export const useQuizData = () => {
  return useQuery({
    queryKey: ['quizData'],
    queryFn: fetchQuizData,
  });
};
