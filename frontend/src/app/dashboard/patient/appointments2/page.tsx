import { AppointmentsList } from '@/components/userDashboard/appointments-list'
import React from 'react'

const Features: React.FC = () => {
  return (
    <>
      <main className='min-h-screen bg-gray-50'>
        <AppointmentsList />
      </main>
    </>
  )
}

export default Features
