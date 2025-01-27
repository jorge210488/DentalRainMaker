'use client';

import React, { useState } from 'react';
import Header from '@/components/patientDashboard/ScheduledAppointment/Header';
import CalendarComponent from '@/components/patientDashboard/ScheduledAppointment/Calendar';
import AvailableSlots from '@/components/patientDashboard/ScheduledAppointment/AvailableSlots';
import ConfirmButton from '@/components/patientDashboard/ScheduledAppointment/ConfirmButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const appointmentSlots = [
  { date: '2025-01-15', day: 'Wednesday', times: ['8:00:00', '9:00:00', '10:00:00', '11:00:00'] },
  { date: '2025-01-23', day: 'Thursday', times: ['10:00:00', '11:00:00', '12:00', '13:00:00'] },
  { date: '2025-01-28', day: 'Tuesday', times: ['14:00:00', '15:00:00', '16:00', '17:00:00'] },
];

const AppointmentsDateTime = () => {

  const dispatch = useDispatch()
  const appointment = useSelector((state: RootState) => state.appointmentPost)

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [filteredSlots, setFilteredSlots] = useState(appointmentSlots);
  
  const handleDateChange = (value: Date | null) => {
    if (value) {
      setSelectedDate(value);
      const formattedDate = value.toISOString().split('T')[0];
      const slotsForSelectedDate = appointmentSlots.filter((slot) => slot.date === formattedDate);
      setFilteredSlots(slotsForSelectedDate);
    } else {
      setSelectedDate(null);
      setFilteredSlots([]);
    }
    setSelectedTime(null);
  };

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  console.log("asi va quedando la cita",appointment);
  

  return (
    
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Date and Time</h1>
        <div className="sm:flex sm:justify-center sm:items-start sm:space-x-6">
          <CalendarComponent selectedDate={selectedDate} onDateChange={handleDateChange} isWeekday={isWeekday} />
          <AvailableSlots
            selectedDate={selectedDate}
            slots={filteredSlots}
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
          />
        </div>
      </div>
      <ConfirmButton selectedTime={selectedTime} />
    </div>
  );
};

export default AppointmentsDateTime;


