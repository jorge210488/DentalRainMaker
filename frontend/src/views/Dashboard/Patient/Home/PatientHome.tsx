'use client'

import React,{ useEffect} from 'react';
import { useSession } from 'next-auth/react';
import AppointmentCard from '@/components/MainComponents/AppointmentCard/AppointmentCard';
import UpcomingAppointments from './UpcomingAppointments';

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
      <UpcomingAppointments />
      

      </main>
    </div>
  );
};

export default PatientHome;