'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { getlistDoctors } from '@/server/appointments'
import DoctorList from '@/components/patientDashboard/ScheduledAppointment/DoctorList'
import SearchBar from '@/components/patientDashboard/ScheduledAppointment/Searchbar'

type Doctor = {
  remote_id: number
  name: string
  specialty: string
}

const steps = [
  { number: 1, label: 'Doctor', active: true },
  { number: 2, label: 'Date & Time', active: false },
  { number: 3, label: 'Confirm', active: false },
]

export default function DoctorSelectionPage() {
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState('')
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const router = useRouter()

  useEffect(() => {
    const initializeDoctors = async () => {
      try {
        if (session?.user?.token && session?.user?.clinicId) {
          const response = await getlistDoctors(
            session.user.clinicId,
            session.user.token,
          )
          setDoctors(response)
        }
      } catch (error) {
        console.error('Error initializing doctors:', error)
      }
    }

    initializeDoctors()
  }, [session])

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <header className='mb-6'>
        {/* Header content */}
        <h1 className='text-center text-xl font-semibold'>
          Who do you want to see?
        </h1>
      </header>

      <main className='mx-auto max-w-2xl'>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <DoctorList filteredDoctors={filteredDoctors} router={router} />
      </main>
    </div>
  )
}
