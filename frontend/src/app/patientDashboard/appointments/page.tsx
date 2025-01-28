'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/patientDashboard/Appointments/Header'
import Filters from '@/components/patientDashboard/Appointments/Filters'
import AppointmentsList from '@/components/patientDashboard/Appointments/AppointmentList'
import { useSession } from 'next-auth/react'
import { getAppointmentsByContactId } from '@/server/appointments'

export type Appointment = {
  remote_id: string
  doctor: string
  operator: string
  date: string
  time: string
  location: string
  atention_type: 'In-person' | 'Virtual'
  paymentStatus: 'Pending' | 'Paid'
}

const today = new Date().toISOString().split('T')[0]

export default function AppointmentsDashboard() {
  const { data: session } = useSession()
  const [primaryFilter, setPrimaryFilter] = useState<'History' | 'Upcoming'>(
    'Upcoming',
  )
  const [secondaryFilter, setSecondaryFilter] = useState<
    'All' | 'In-person' | 'Virtual'
  >('All')
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    const initializeAppointments = async () => {
      try {
        if (
          session?.user?.token &&
          session?.user?.clinicId &&
          session?.user?.userId
        ) {
          const response = await getAppointmentsByContactId(
            session.user.clinicId,
            session.user.userId,
            session.user.token,
          )
          setAppointments(response)
        }
      } catch (error) {
        console.error('Error initializing user appointments:', error)
      }
    }
    initializeAppointments()
  }, [session])

  const filteredAppointments = appointments.filter((appointment) => {
    const isPrimaryMatch =
      primaryFilter === 'History'
        ? new Date(appointment.date) < new Date(today)
        : new Date(appointment.date) >= new Date(today)

    const isSecondaryMatch =
      secondaryFilter === 'All' || appointment.atention_type === secondaryFilter

    return isPrimaryMatch && isSecondaryMatch
  })

  return (
    <div className='min-h-screen w-full bg-gray-100'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <main className='py-4 sm:py-6 lg:py-8'>
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
    </div>
  )
}
