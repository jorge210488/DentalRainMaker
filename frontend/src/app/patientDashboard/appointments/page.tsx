'use client'
import React, { useState } from 'react'
import Header from '@/components/patientDashboard/Appointments/Header'
import Filters from '@/components/patientDashboard/Appointments/Filters'
import AppointmentsList from '@/components/patientDashboard/Appointments/AppointmentList'

export type Appointment = {
  remote_id: string
  doctor: string
  operator: string
  patient: string
  date: string
  time: string
  location: string
  atention_type: 'In-person' | 'Virtual'
  paymentStatus: 'Pending' | 'Paid'
}

const today = new Date().toISOString().split('T')[0]

const appointments: Appointment[] = [
  // Aquí van los datos de citas (idéntico al original)
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
      <main className='ml-24'>
        <Header />
        <Filters
          primaryFilter={primaryFilter}
          setPrimaryFilter={setPrimaryFilter}
          secondaryFilter={secondaryFilter}
          setSecondaryFilter={setSecondaryFilter}
        />
        <AppointmentsList appointments={filteredAppointments} />
      </main>
    </div>
  )
}

export default AppointmentsPage
