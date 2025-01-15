"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

type AppointmentSlot = {
  date: string;
  day: string;
  times: string[];
};

const appointmentSlots: AppointmentSlot[] = [
  {
    date: "2025-01-15",
    day: "Wednesday",
    times: ["2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"],
  },
  {
    date: "2025-01-23",
    day: "Thursday",
    times: ["2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"],
  },
  
  {
    date: "2025-01-28",
    day: "Tuesday",
    times: ["2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"],
  },
  {
    date: "2025-01-30",
    day: "Thursday",
    times: ["2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"],
  },
  {
    date: "2025-02-02",
    day: "Tuesday",
    times: ["2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"],
  },
  {
    date: "2025-02-03",
    day: "Thursday",
    times: ["2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"],
  },
];

const today = new Date();

const AppointmentsDateTime = () => {
  const [selectedFilter, setSelectedFilter] = useState<"This Week" | "This Month" | "Next Month">(
    "This Month"
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const router = useRouter();

  const getStartAndEndDates = (filter: string) => {
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const endOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);

    if (filter === "This Week") return { start: startOfWeek, end: endOfWeek };
    if (filter === "This Month") return { start: today, end: new Date(today.getFullYear(), today.getMonth() + 1, 0) };
    if (filter === "Next Month") return { start: startOfNextMonth, end: endOfNextMonth };

    return { start: today, end: today };
  };

  const filterAppointments = () => {
    const { start, end } = getStartAndEndDates(selectedFilter);

    return appointmentSlots.filter((slot) => {
      const slotDate = new Date(slot.date);
      return slotDate >= start && slotDate <= end;
    });
  };

  const filteredSlots = filterAppointments();

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <header className="mb-6">
        <div className="flex justify-center items-center gap-6 mb-8">
          <div 
          onClick={() => router.push('/dashboard/patient/scheduled-appointment/virtual')}
          className="flex cursor-pointer items-center">
            <div className="rounded-full bg-green-600 text-white w-8 h-8 flex items-center justify-center">
              1
            </div>
            <span className="ml-2 text-sm font-semibold">Doctor</span>
          </div>
          <div 
          onClick={() => router.push('/dashboard/patient/scheduled-appointment/virtual/search-date')}
          className="flex cursor-pointer items-center">
            <div className="rounded-full bg-green-600 text-white w-8 h-8 flex items-center justify-center">
              2
            </div>
            <span className="ml-2 text-sm font-semibold">Date & Time</span>
          </div>
          <div className="flex items-center">
            <div className="rounded-full bg-gray-400 text-white w-8 h-8 flex items-center justify-center">
              3
            </div>
            <span className="ml-2 text-sm font-semibold">Confirm</span>
          </div>
        </div>
      </header>


      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Date and Time</h1>
        <div className="mt-4 flex justify-center gap-4">
          {["This Week", "This Month", "Next Month"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter as "This Week" | "This Month" | "Next Month")}
              className={`rounded-full px-4 py-2 ${
                selectedFilter === filter ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-lg">
        <div className="grid grid-cols-3 gap-4">
          {filteredSlots.map((slot) => (
            <div key={slot.date} className="border rounded-lg p-4">
              <h2 className="text-lg font-bold text-gray-800">{slot.day}</h2>
              <p className="text-sm text-gray-500">{slot.date}</p>
              <ul className="mt-4 space-y-2">
                {slot.times.map((time) => (
                  <li key={time}>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="appointmentTime"
                        value={`${slot.date} ${time}`}
                        checked={selectedSlot === `${slot.date} ${time}`}
                        onChange={() => setSelectedSlot(`${slot.date} ${time}`)}
                        className="accent-purple-500"
                      />
                      {time}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-6 flex justify-center">
        <button
          disabled={!selectedSlot}
          onClick={() => router.push('/dashboard/patient/scheduled-appointment/virtual/confirm')}
          className={`rounded-lg px-6 py-2 ${
            selectedSlot ? "bg-green-600 text-white" : "bg-gray-300 text-gray-500"
          }`}
        >
          Next Step
        </button>
      </footer>
    </div>
  );
};

export default AppointmentsDateTime;