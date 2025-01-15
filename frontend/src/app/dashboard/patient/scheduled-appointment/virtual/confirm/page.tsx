"use client";
import React from "react";
import { useRouter } from 'next/navigation';

const AppointmentConfirmation = () => {
  const appointmentDetails = {
    type: "Virtual",
    day: "Thursday",
    date: "01/23/2025",
    time: "3:00 PM",
    location: "South Clinic - Arequipa - Odontology",
    doctor: "Dr. Babilonia Curaca, Sandra",
    patient: "Jose Antonio Rojas Huaman",
    insurance: "Pacifico EPS",
    cost: "$35",
  };
  const router = useRouter();

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
          <div 
          onClick={() => router.push('/dashboard/patient/scheduled-appointment/virtual/confirm')}
          className="flex cursor-pointer items-center">
            <div className="rounded-full  bg-green-600 text-white w-8 h-8 flex items-center justify-center">
              3
            </div>
            <span className="ml-2 text-sm font-semibold">Confirm</span>
          </div>
        </div>
      </header>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">You're almost done!</h1>
        <p className="text-gray-600">Review and confirm</p>
      </div>

      <main className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
              {appointmentDetails.type}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{appointmentDetails.day}</h2>
          <p className="text-sm text-gray-600">
            <span className="font-medium">{appointmentDetails.date}</span> at{" "}
            <span className="font-medium">{appointmentDetails.time}</span>
          </p>
        </div>

        <div className="mb-4">
          <p className="text-gray-800">
            <strong>Location:</strong> {appointmentDetails.location}
          </p>
          <p className="text-gray-800">
            <strong>Doctor:</strong> {appointmentDetails.doctor}
          </p>
          <p className="text-gray-800">
            <strong>Patient:</strong> {appointmentDetails.patient}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-800">
            <strong>Insurance Plan:</strong> {appointmentDetails.insurance}{" "}
            <button className="text-blue-600 font-medium hover:underline ml-2">Edit</button>
          </p>
          <p className="text-gray-800">
            <strong>Cost:</strong> {appointmentDetails.cost}
          </p>
        </div>

        <div className="flex justify-between mt-6">
          <button 
          onClick={() => router.push('/dashboard/patient/appointments')}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
            Cancel
          </button>
          <button 
          onClick={() => router.push('/dashboard/patient/appointments')}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
            Confirm
          </button>
        </div>
      </main>
    </div>
  );
};

export default AppointmentConfirmation;
