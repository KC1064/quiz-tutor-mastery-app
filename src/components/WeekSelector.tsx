
import React from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type WeekSelectorProps = {
  weeks: string[];
  onWeekSelect: (week: string) => void;
};

export const WeekSelector = ({ weeks, onWeekSelect }: WeekSelectorProps) => {
  const { selectedWeek } = useQuiz();

  return (
    <div className="mb-8">
      <label className="block text-gray-700 font-semibold mb-2">
        Select a Week:
      </label>
      <Select
        value={selectedWeek}
        onValueChange={onWeekSelect}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a week" />
        </SelectTrigger>
        <SelectContent>
          {weeks.map((week) => (
            <SelectItem key={week} value={week}>
              {week}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
