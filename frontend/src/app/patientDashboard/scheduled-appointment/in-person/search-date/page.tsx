'use client';

import React, { useState } from 'react';
import Header from '@/components/patientDashboard/ScheduledAppointment/Header';
import CalendarComponent from '@/components/patientDashboard/ScheduledAppointment/Calendar';
import AvailableSlots from '@/components/patientDashboard/ScheduledAppointment/AvailableSlots';
import ConfirmButton from '@/components/patientDashboard/ScheduledAppointment/ConfirmButton';

const appointmentSlots = [
  { date: '2025-01-15', day: 'Wednesday', times: ['8:00 AM', '9:00 AM'] },
  { date: '2025-01-23', day: 'Thursday', times: ['10:00 AM', '11:00 AM'] },
  { date: '2025-01-28', day: 'Tuesday', times: ['2:00 PM', '3:00 PM'] },
];

const AppointmentsDateTime = () => {
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


