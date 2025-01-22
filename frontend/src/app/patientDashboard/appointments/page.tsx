'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { DashboardShell } from '@/components/patientDashboard/dashboard-shell'

const today = new Date().toISOString().split('T')[0]

export type Appointment = {
  id: number
  specialty: string
  doctor: string
  patient: string
  date: string
  time: string
  location: string
  office: string
  type: 'In-person' | 'Virtual'
  paymentStatus: 'Pending' | 'Paid'
}

const appointments: Appointment[] = [
  {
    id: 1,
    specialty: 'Dentistry',
    doctor: 'Dr. Flora Emperatriz Zuñiga',
    patient: 'Jose Antonio Rojas Huaman',
    date: '2025-01-11',
    time: '3:20 PM',
    location: 'Chacarilla Clinical Center',
    office: 'Office 37',
    type: 'In-person',
    paymentStatus: 'Paid',
  },
  {
    id: 2,
    specialty: 'Dentistry',
    doctor: 'Dr. Mariana Pérez',
    patient: 'Jose Antonio Rojas Huaman',
    date: '2025-01-13',
    time: '10:00 AM',
    location: 'San Borja Clinical Center',
    office: 'Office 12',
    type: 'Virtual',
    paymentStatus: 'Paid',
  },
  {
    id: 3,
    specialty: 'Dentistry',
    doctor: 'Dr. Mariana Pérez',
    patient: 'Jose Antonio Rojas Huaman',
    date: '2025-01-15',
    time: '10:00 AM',
    location: 'San Borja Clinical Center',
    office: 'Office 12',
    type: 'In-person',
    paymentStatus: 'Paid',
  },
  {
    id: 4,
    specialty: 'Dentistry',
    doctor: 'Dr. Mariana Pérez',
    patient: 'Jose Antonio Rojas Huaman',
    date: '2025-01-16',
    time: '10:00 AM',
    location: 'San Borja Clinical Center',
    office: 'Office 12',
    type: 'Virtual',
    paymentStatus: 'Pending',
  },
  {
    id: 5,
    specialty: 'Dentistry',
    doctor: 'Dr. Mariana Pérez',
    patient: 'Jose Antonio Rojas Huaman',
    date: '2025-01-18',
    time: '12:00 PM',
    location: 'San Borja Clinical Center',
    office: 'Office 14',
    type: 'In-person',
    paymentStatus: 'Pending',
  },
]

const AppointmentsPage = () => {
  const [primaryFilter, setPrimaryFilter] = useState<'History' | 'Upcoming'>(
    'Upcoming',
  )
  const [secondaryFilter, setSecondaryFilter] = useState<
    'All' | 'In-person' | 'Virtual'
  >('All')
  const router = useRouter()

  const filteredAppointments = appointments.filter((appointment) => {
    const isPrimaryMatch =
      primaryFilter === 'History'
        ? new Date(appointment.date) < new Date(today)
        : new Date(appointment.date) >= new Date(today)

    const isSecondaryMatch =
      secondaryFilter === 'All' || appointment.type === secondaryFilter

    return isPrimaryMatch && isSecondaryMatch
  })

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      {/* Main content */}
      <main className='ml-24'>
        {/* Header */}
        <header className='mb-6 flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>My Appointments</h1>
          <button
            onClick={() =>
              router.push('/patientDashboard/scheduled-appointment')
            }
            className='rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-purple-600'
          >
            + Schedule Appointment
          </button>
        </header>

        {/* Primary filters */}
        <div className='mb-4 flex items-center gap-4'>
          <button
            onClick={() => setPrimaryFilter('History')}
            className={`rounded-lg px-4 py-2 ${
              primaryFilter === 'History'
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            History
          </button>
          <button
            onClick={() => setPrimaryFilter('Upcoming')}
            className={`rounded-lg px-4 py-2 ${
              primaryFilter === 'Upcoming'
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Upcoming
          </button>
        </div>

        {/* Secondary filters */}
        <div className='mb-4 flex items-center gap-4'>
          <button
            onClick={() => setSecondaryFilter('All')}
            className={`rounded-lg px-4 py-2 ${
              secondaryFilter === 'All'
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSecondaryFilter('In-person')}
            className={`rounded-lg px-4 py-2 ${
              secondaryFilter === 'In-person'
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            In-person
          </button>
          <button
            onClick={() => setSecondaryFilter('Virtual')}
            className={`rounded-lg px-4 py-2 ${
              secondaryFilter === 'Virtual'
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Virtual
          </button>
        </div>

        {/* Appointment list */}
        <div className='space-y-4'>
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className='flex items-center justify-between rounded-lg bg-white p-4 shadow-md'
            >
              <div>
                <p
                  className={`text-sm ${
                    appointment.paymentStatus === 'Pending'
                      ? 'text-red-500'
                      : 'text-green-500'
                  }`}
                >
                  {appointment.paymentStatus === 'Pending'
                    ? 'Payment pending'
                    : 'Paid'}
                </p>
                <h2 className='text-lg font-bold'>{appointment.doctor}</h2>
                <p className='text-sm text-gray-600'>{appointment.specialty}</p>
                <p className='text-sm text-gray-600'>
                  Patient: {appointment.patient}
                </p>
                <p className='text-sm text-gray-600'>
                  {appointment.date} - {appointment.time}
                </p>
                <p className='text-sm text-gray-600'>
                  {appointment.location} - {appointment.office}
                </p>
              </div>
              <div className='flex flex-col items-end gap-2'>
                {/* <button className="text-green-600 hover:underline">Reschedule</button>
                <button className="text-red-600 hover:underline">Cancel</button> */}
                {appointment.paymentStatus === 'Pending' && (
                  <button className='rounded-lg border border-green-600 px-4 py-1 text-green-600 hover:bg-green-100'>
                    Pay
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default AppointmentsPage
