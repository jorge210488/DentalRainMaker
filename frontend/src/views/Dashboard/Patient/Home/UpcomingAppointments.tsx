'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import AppointmentCard from '@/components/MainComponents/AppointmentCard/AppointmentCard'
import { getUserAppointments } from '@/server/User/getUserAppointments'
import { IAppointment } from '@/interfaces/ComponentsInterfaces/Appointment'

const UpcomingAppointments: React.FC = () => {
  const { data: session, status } = useSession()
  const [userAppointments, setUserAppointments] = useState<IAppointment[]>([])

  useEffect(() => {
    const fetchUserAppointments = async () => {
      if (status !== 'authenticated') return
      if (!session?.user?.userId || !session?.user?.token) {
        console.error('Missing session data')
        return
      }
      try {
        const response = await getUserAppointments(
          session.user.userId,
          session.user.token,
        )
        setUserAppointments(response)
      } catch (error) {
        console.error('Error fetching user appointments:', error)
      }
    }
    fetchUserAppointments()
  }, [session, status])

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  console.log(userAppointments)

  if (userAppointments?.length === 0) {
    return (
      <section className='mt-8 w-full space-y-4'>
        <h3 className='mb-4 text-xl font-semibold'>
          Your upcoming appointments
        </h3>
        <p>You have no upcoming appointments</p>
      </section>
    )
  }

  return (
    <section className='mt-8 w-full space-y-4'>
      <h3 className='mb-4 text-xl font-semibold'>Your upcoming appointments</h3>
      {userAppointments.map((appointment) => (
        <AppointmentCard
          key={appointment._id}
          _id={appointment._id}
          // start_time={new Date()}
          additional_data={{
            doctor_name: appointment.additional_data.doctor_name,
            clinic_name: appointment.additional_data.clinic_name,
            paid: appointment.additional_data.paid,
          }}
        />
      ))}
    </section>
  )
}

export default UpcomingAppointments
