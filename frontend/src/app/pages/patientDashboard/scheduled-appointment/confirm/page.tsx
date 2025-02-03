'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useSession } from 'next-auth/react'
import { getDayOfWeek } from '@/utils/getDayOfWeek'
import { postAppointment } from '@/server/appointments'
import Swal from 'sweetalert2'
import { clearAppointmentPost } from '@/redux/slices/appointmentPostSlice'

const AppointmentConfirmation = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const dispatch = useDispatch()
  const appointment = useSelector((state: RootState) => state.appointmentPost)
  const { clinics } = useSelector((state: RootState) => state.clinics)
  const clinic = Array.isArray(clinics)
    ? clinics.find((clinic) => clinic._id === session?.user.clinicId)
    : null

  const appointmentDetails = {
    type: 'In-person',
    day: getDayOfWeek(appointment.wall_start_time.slice(0, 10)),
    date: appointment.wall_start_time.slice(0, 10),
    time: appointment.wall_start_time.slice(11),
    location: clinic?.clinic_name,
    doctor: appointment.notes,
    patient: session?.user.given_name + ' ' + session?.user.family_name,
    insurance: 'Pacifico EPS',
    cost: '$35',
  }

  console.log('asi quedo el appointment', appointment)

  const handleAppointmentConfirm = async () => {
    try {
      if (session?.user.clinicId && session.user.token) {
        const response = await postAppointment(
          session.user.clinicId,
          session.user.token,
          appointment,
        )

        if (response) {
          Swal.fire({
            title: 'Success',
            text: 'The appointment has been created successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          })
          dispatch(clearAppointmentPost())
          router.push('/pages/patientDashboard/appointments')
        } else {
          Swal.fire({
            title: 'Error',
            text: 'An error occurred while creating the appointment.',
            icon: 'error',
            confirmButtonText: 'Try Again',
          })
        }
      }
    } catch (error) {
      Swal.fire({
        title: 'Connection Error',
        text: 'Failed to connect to the server. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <header className='mb-6'>
        <div className='mb-8 flex items-center justify-center gap-6'>
          <div
            onClick={() =>
              router.push(
                '/pages/patientDashboard/scheduled-appointment/chooseDoctor',
              )
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
                '/pages/patientDashboard/scheduled-appointment/search-date',
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
                '/pages/patientDashboard/scheduled-appointment/confirm',
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
            onClick={() => router.push('/pages/patientDashboard/appointments')}
            className='rounded-lg bg-red-500 px-6 py-2 text-white hover:bg-red-600'
          >
            Cancel
          </button>
          <button
            onClick={handleAppointmentConfirm}
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
