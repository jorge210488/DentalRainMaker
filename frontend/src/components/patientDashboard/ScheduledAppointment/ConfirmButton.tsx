'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { updateAppointmentPost } from '@/redux/slices/appointmentPostSlice'
import { addOneHour } from '@/utils/addOneHour'
import { useSession } from 'next-auth/react'

type ConfirmButtonProps = {
  selectedTime: string | null
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ selectedTime }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const dispatch = useDispatch()
  const appointment = useSelector((state: RootState) => state.appointmentPost)

  const handleSelectTime = () => {
    dispatch(
      updateAppointmentPost({
        contact_id: session?.user.userId,
        wall_start_time: appointment.wall_start_time + ' ' + selectedTime,
        wall_end_time:
          appointment.wall_end_time + ' ' + addOneHour(String(selectedTime)),
        operatory: 'resources/operatory_1',
      }),
    )

    router.push('/pages/patientDashboard/scheduled-appointment/confirm')
  }

  return (
    <footer className='mt-6 flex justify-center'>
      <button
        disabled={!selectedTime}
        onClick={handleSelectTime}
        className={`rounded-lg px-6 py-2 ${
          selectedTime
            ? 'bg-green-600 text-white'
            : 'cursor-not-allowed bg-gray-300 text-gray-500'
        }`}
      >
        Next Step
      </button>
    </footer>
  )
}

export default ConfirmButton
