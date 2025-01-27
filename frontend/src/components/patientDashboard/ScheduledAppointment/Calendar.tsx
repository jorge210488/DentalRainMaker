'use client';

import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type CalendarComponentProps = {
  selectedDate: Date | null;
  onDateChange: (value: Date | null) => void;
  isWeekday: (date: Date) => boolean;
};

const CalendarComponent: React.FC<CalendarComponentProps> = ({ selectedDate, onDateChange, isWeekday }) => {
  return (
    <div className="flex justify-center mb-6 sm:mb-0">
      <Calendar
        onChange={(value) => onDateChange(value as Date | null)}
        value={selectedDate}
        tileDisabled={({ date }) => !isWeekday(date)}
      />
    </div>
  );
};

export default CalendarComponent;
