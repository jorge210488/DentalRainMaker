// DoctorItem.tsx
import React from 'react'

type Doctor = {
  remote_id: number
  name: string
  specialty: string
}

type DoctorItemProps = {
  doctor: Doctor
  router: any
}

const DoctorItem = ({ doctor, router }: DoctorItemProps) => {
  return (
    <li className='flex items-center justify-between rounded-lg bg-white p-4 shadow-md'>
      <div>
        <p className='text-sm font-medium text-gray-800'>{doctor.specialty}</p>
        <h3 className='text-lg font-bold'>{doctor.name}</h3>
      </div>
      <button
        onClick={() => router.push('/patientDashboard/scheduled-appointment/in-person/search-date')}
        className='rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700'
      >
        Select
      </button>
    </li>
  )
}

export default DoctorItem
