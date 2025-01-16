'use client'

import React,{ useEffect} from 'react';
import { useSession } from 'next-auth/react';
import AppointmentCard from '@/components/MainComponents/AppointmentCard/AppointmentCard';

const PatientHome: React.FC = () => {
  const { data: session, status } = useSession()

  useEffect(() => {
      if (status === 'authenticated') {
        console.log('Token:', session?.user?.token)
        console.log('User ID:', session?.user?.userId)
        console.log('User Type:', session?.user?.type)
        console.log('User views', session?.user?.views)
      } else if (status === 'unauthenticated') {
        console.log('No session available')
      }
    }, [status, session])


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header Section */}
      <header className="w-full bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">Welcome, {session?.user?.name || 'Guest'}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex flex-col items-center py-8">
        <p className="text-gray-600 mb-6">Clinic xyz</p>

        <h3 className="text-xl font-semibold mb-4">How can we help you?</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <button className="bg-green-100 rounded-md p-4 text-center">
            Request appointments
          </button>
          <button className="bg-green-100 rounded-md p-4 text-center">
            My appointments
          </button>
          <button className="bg-purple-100 rounded-md p-4 text-center">
            My exams
          </button>
        </div>

      {/* Upcoming Appointments */}  
      <section className="mt-8 space-y-4 w-full">
          <h3 className="text-xl font-semibold mb-4">Your upcoming appointments</h3>
          <AppointmentCard
            _id="1" 
            start_time={new Date("2023-10-01T10:00:00Z")} 
            additional_data={{ 
                doctor_name:"Docstora 1",
                clinic_name:"Clinica 1",
                room_number:"Cuarto 1",
                paid:false}} 
            />
            <AppointmentCard 
            _id="2"
            start_time={new Date("2023-10-01T10:00:00Z")} 
            additional_data={{ 
                doctor_name:"Docstora 1",
                clinic_name:"Clinica 1",
                room_number:"Cuarto 1",
                paid:true}} 
            />
      </section>
      

      </main>
    </div>
  );
};

export default PatientHome;