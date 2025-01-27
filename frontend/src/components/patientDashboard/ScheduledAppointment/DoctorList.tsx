// DoctorList.tsx
import React from 'react'
import DoctorItem from './DoctorItem'

type Doctor = {
  remote_id: number
  name: string
  specialty: string
}

type DoctorListProps = {
  filteredDoctors: Doctor[]
  router: any
}

const DoctorList = ({ filteredDoctors, router }: DoctorListProps) => {
  return (
    <div>
      <h2 className='mb-4 text-lg font-semibold'>Available doctors near you:</h2>
      <ul className='space-y-4'>
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <DoctorItem key={doctor.remote_id} doctor={doctor} router={router} />
          ))
        ) : (
          <p className='text-sm text-gray-500'>
            No doctors found matching your search.
          </p>
        )}
      </ul>
    </div>
  )
}

export default DoctorList
