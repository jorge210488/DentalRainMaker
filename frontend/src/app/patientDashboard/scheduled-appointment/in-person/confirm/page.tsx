'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const AppointmentConfirmation = () => {
  const appointmentDetails = {
    type: 'In-person',
    day: 'Thursday',
    date: '01/23/2025',
    time: '3:00 PM',
    location: 'South Clinic - Arequipa - Odontology',
    doctor: 'Dr. Babilonia Curaca, Sandra',
    patient: 'Jose Antonio Rojas Huaman',
    insurance: 'Pacifico EPS',
    cost: '$35',
  }
  const router = useRouter()
  const dispatch = useDispatch()
  const appointment = useSelector((state: RootState) => state.appointmentPost)

  console.log("asi quedo el appointmne", appointment);
  

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <header className='mb-6'>
        <div className='mb-8 flex items-center justify-center gap-6'>
          <div
            onClick={() =>
              router.push('/patientDashboard/scheduled-appointment/in-person')
            }
            className='flex cursor-pointer items-center'
          >
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white'>
              1
            </div>
            <span className='ml-2 text-sm font-semibold'>Doctor</span>
          </div>
          <div
            onClick={() =>
              router.push(
                '/patientDashboard/scheduled-appointment/in-person/search-date',
              )
            }
            className='flex cursor-pointer items-center'
          >
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white'>
              2
            </div>
            <span className='ml-2 text-sm font-semibold'>Date & Time</span>
          </div>
          <div
            onClick={() =>
              router.push(
                '/patientDashboard/scheduled-appointment/in-person/confirm',
              )
            }
            className='flex cursor-pointer items-center'
          >
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white'>
              3
            </div>
            <span className='ml-2 text-sm font-semibold'>Confirm</span>
          </div>
        </div>
      </header>
      <div className='mb-6 text-center'>
        <h1 className='text-2xl font-bold'>You're almost done!</h1>
        <p className='text-gray-600'>Review and confirm</p>
      </div>

      <main className='mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg'>
        <div className='mb-6 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span className='rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700'>
              {appointmentDetails.type}
            </span>
          </div>
        </div>

        <div className='mb-4'>
          <h2 className='text-lg font-semibold text-gray-800'>
            {appointmentDetails.day}
          </h2>
          <p className='text-sm text-gray-600'>
            <span className='font-medium'>{appointmentDetails.date}</span> at{' '}
            <span className='font-medium'>{appointmentDetails.time}</span>
          </p>
        </div>

        <div className='mb-4'>
          <p className='text-gray-800'>
            <strong>Location:</strong> {appointmentDetails.location}
          </p>
          <p className='text-gray-800'>
            <strong>Doctor:</strong> {appointmentDetails.doctor}
          </p>
          <p className='text-gray-800'>
            <strong>Patient:</strong> {appointmentDetails.patient}
          </p>
        </div>

        <div className='mb-4 flex items-center justify-between'>
          <p className='text-gray-800'>
            <strong>Insurance Plan:</strong> {appointmentDetails.insurance}{' '}
            <button className='ml-2 font-medium text-blue-600 hover:underline'>
              Edit
            </button>
          </p>
          <p className='text-gray-800'>
            <strong>Cost:</strong> {appointmentDetails.cost}
          </p>
        </div>

        <div className='mt-6 flex justify-between'>
          <button
            onClick={() => router.push('/patientDashboard/appointments')}
            className='rounded-lg bg-red-500 px-6 py-2 text-white hover:bg-red-600'
          >
            Cancel
          </button>
          <button
            onClick={() => router.push('/patientDashboard/appointments')}
            className='rounded-lg bg-green-500 px-6 py-2 text-white hover:bg-green-600'
          >
            Confirm
          </button>
        </div>
      </main>
    </div>
  )
}

export default AppointmentConfirmation
