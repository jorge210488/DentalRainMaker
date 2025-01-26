'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type ConfirmButtonProps = {
  selectedTime: string | null;
};

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ selectedTime }) => {
  const router = useRouter();

  return (
    <footer className="mt-6 flex justify-center">
      <button
        disabled={!selectedTime}
        onClick={() =>
          router.push('/patientDashboard/scheduled-appointment/in-person/confirm')
        }
        className={`rounded-lg px-6 py-2 ${
          selectedTime
            ? 'bg-green-600 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Next Step
      </button>
    </footer>
  );
};

export default ConfirmButton;
