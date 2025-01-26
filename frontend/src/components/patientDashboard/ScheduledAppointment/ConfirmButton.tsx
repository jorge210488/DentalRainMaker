'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type ConfirmButtonProps = {
  selectedTime: string | null;
};

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ selectedTime }) => {
  const router = useRouter();
  const dispatch = useDispatch()
  const appointment = useSelector((state: RootState) => state.appointmentPost)

  const handleSelectTime = () =>{
    console.log("esta es la hora elegida", selectedTime);
    console.log("cita con fecha", appointment);
    
    router.push('/patientDashboard/scheduled-appointment/in-person/confirm')
  }

  return (
    <footer className="mt-6 flex justify-center">
      <button
        disabled={!selectedTime}
        onClick={handleSelectTime}
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
