'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const ScheduleAppointment = () => {
  const router = useRouter()

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Main Content */}
      <div className='flex flex-col items-center justify-center px-6 py-12'>
        <h1 className='text-center text-2xl font-semibold text-gray-800'>
          Schedule a virtual or in-person appointment at our clinics and medical
          centers.
        </h1>
        <p className='mt-4 text-center text-gray-600'>
          Select your preferred type of appointment.
        </p>

        {/* Appointment Options */}
        <div className='mt-8 w-full max-w-md space-y-4'>
          {/* In-Person Appointment */}
          <div
            onClick={() =>
              router.push(
                '/patientDashboard/scheduled-appointment/chooseDoctor',
              )
            }
            className='flex cursor-pointer items-center justify-between rounded-lg bg-white px-6 py-4 shadow hover:bg-gray-100'
          >
            <div>
              <h3 className='text-lg font-medium text-gray-800'>
                In-Person Appointment
              </h3>
              <p className='text-sm text-gray-500'>
                Schedule an appointment with a specialist
              </p>
            </div>
            <span className='text-2xl text-green-500'>→</span>
          </div>

          {/* Virtual Appointment */}
          <div
            onClick={() =>
              router.push(
                '/patientDashboard/scheduled-appointment/chooseDoctor',
              )
            }
            className='flex cursor-pointer items-center justify-between rounded-lg bg-white px-6 py-4 shadow hover:bg-gray-100'
          >
            <div>
              <h3 className='text-lg font-medium text-gray-800'>
                Virtual Appointment
              </h3>
              <p className='text-sm text-gray-500'>
                Schedule an appointment with a specialist
              </p>
            </div>
            <span className='text-2xl text-green-500'>→</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleAppointment
