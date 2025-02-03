// DoctorItem.tsx
import { updateAppointmentPost } from '@/redux/slices/appointmentPostSlice'
import { RootState } from '@/redux/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
  const dispatch = useDispatch()

  const appointment = useSelector((state: RootState) => state.appointmentPost)

  const handleSelectDoctor = () => {
    console.log('id del doctor select', doctor.remote_id)
    dispatch(
      updateAppointmentPost({
        providers: [
          {
            name: 'resources/' + doctor.remote_id,
            remote_id: String(doctor.remote_id),
            type: 'PROVIDER',
          },
        ],
        notes: doctor.name,
      }),
    )

    router.push('/pages/patientDashboard/scheduled-appointment/search-date')
  }

  return (
    <li className='flex items-center justify-between rounded-lg bg-white p-4 shadow-md'>
      <div>
        <p className='text-sm font-medium text-gray-800'>{doctor.specialty}</p>
        <h3 className='text-lg font-bold'>{doctor.name}</h3>
      </div>
      <button
        onClick={handleSelectDoctor}
        className='rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700'
      >
        Select
      </button>
    </li>
  )
}

export default DoctorItem
