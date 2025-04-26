
import React from 'react';
import { Button } from '@/components/ui/button';

type WeekSelectorProps = {
  weeks: string[];
  onWeekSelect: (week: string) => void;
};

export const WeekSelector: React.FC<WeekSelectorProps> = ({ weeks, onWeekSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {weeks.map((week) => (
        <Button
          key={week}
          variant="outline"
          className="text-foreground hover:bg-accent hover:text-accent-foreground"
          onClick={() => onWeekSelect(week)}
        >
          {week}
        </Button>
      ))}
    </div>
  );
};
