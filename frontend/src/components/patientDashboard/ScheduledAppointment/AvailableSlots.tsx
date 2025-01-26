'use client';

import React from 'react';

type AvailableSlotsProps = {
  selectedDate: Date | null;
  slots: { times: string[] }[];
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
};

const AvailableSlots: React.FC<AvailableSlotsProps> = ({ selectedDate, slots, selectedTime, onTimeSelect }) => {
  if (!selectedDate || slots.length === 0) return null;

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-4 shadow-md sm:w-1/2">
      <h2 className="text-lg font-bold text-center mb-4">
        Available Slots for {selectedDate.toDateString()}
      </h2>
      <ul className="space-y-2">
        {slots[0].times.map((time) => (
          <li key={time} className="flex items-center gap-2">
            <button
              onClick={() => onTimeSelect(time)}
              className={`w-full text-left p-2 rounded-md ${
                selectedTime === time
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {time}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableSlots;
