'use client'

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import UpcomingAppointments from './UpcomingAppointments'

const PatientHome: React.FC = () => {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      console.log('User:', session?.user)

      console.log('Token:', session?.user?.token)
      console.log('User ID:', session?.user?.userId)
      console.log('User Type:', session?.user?.type)
      console.log('User views', session?.user?.views)
    } else if (status === 'unauthenticated') {
      console.log('No session available')
    }
  }, [status, session])

  return (
    <div className='flex min-h-screen flex-col items-center bg-gray-100'>
      {/* Header Section */}
      <header className='w-full bg-white p-4 shadow'>
        <div className='container mx-auto flex items-center justify-between'>
          <h1 className='text-lg font-bold'>
            Welcome, {session?.user?.name || 'Guest'}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto flex flex-col items-center py-8'>
        <p className='mb-6 text-gray-600'>Clinic xyz</p>

        <h3 className='mb-4 text-xl font-semibold'>How can we help you?</h3>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
          <button className='rounded-md bg-green-100 p-4 text-center'>
            Request appointments
          </button>
          <button className='rounded-md bg-green-100 p-4 text-center'>
            My appointments
          </button>
          <button className='rounded-md bg-purple-100 p-4 text-center'>
            My exams
          </button>
        </div>

        {/* Upcoming Appointments */}
        {/* <UpcomingAppointments /> */}
      </main>
    </div>
  )
}

export default PatientHome
