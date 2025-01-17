'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

type Doctor = {
  id: number
  name: string
  specialty: string
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Alvarez Carpio, Lucia Del Milagro',
    specialty: 'Dentistry',
  },
  {
    id: 2,
    name: 'Babilonia Curaca, Sandra',
    specialty: 'Dentistry',
  },
  {
    id: 3,
    name: 'Cardenas Paredes, Maria Del Carmen',
    specialty: 'Dentistry',
  },
]

const DoctorSelectionPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <header className='mb-6'>
        <div className='mb-8 flex items-center justify-center gap-6'>
          <div
            onClick={() =>
              router.push('/dashboard/patient/scheduled-appointment/in-person')
            }
            className='flex cursor-pointer items-center'
          >
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white'>
              1
            </div>
            <span className='ml-2 text-sm font-semibold'>Doctor</span>
          </div>
          <div className='flex items-center'>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-white'>
              2
            </div>
            <span className='ml-2 text-sm font-semibold'>Date & Time</span>
          </div>
          <div className='flex items-center'>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-white'>
              3
            </div>
            <span className='ml-2 text-sm font-semibold'>Confirm</span>
          </div>
        </div>
        <h1 className='text-center text-xl font-semibold'>
          Who do you want to see?
        </h1>
      </header>

      <main className='mx-auto max-w-2xl'>
        {/* Search bar */}
        <div className='mb-6'>
          <label
            htmlFor='search'
            className='mb-2 block text-sm font-medium text-gray-700'
          >
            Search for a doctor
          </label>
          <input
            id='search'
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter doctor's name"
            className='block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-green-500 focus:ring-green-500'
          />
        </div>

        {/* Doctor list */}
        <h2 className='mb-4 text-lg font-semibold'>
          Available doctors near you:
        </h2>
        <ul className='space-y-4'>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <li
                key={doctor.id}
                className='flex items-center justify-between rounded-lg bg-white p-4 shadow-md'
              >
                <div>
                  <p className='text-sm font-medium text-gray-800'>
                    {doctor.specialty}
                  </p>
                  <h3 className='text-lg font-bold'>{doctor.name}</h3>
                </div>
                <button
                  onClick={() =>
                    router.push(
                      '/dashboard/patient/scheduled-appointment/in-person/search-date',
                    )
                  }
                  className='rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700'
                >
                  Select
                </button>
              </li>
            ))
          ) : (
            <p className='text-sm text-gray-500'>
              No doctors found matching your search.
            </p>
          )}
        </ul>
      </main>
    </div>
  )
}

export default DoctorSelectionPage
