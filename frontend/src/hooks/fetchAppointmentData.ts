'use client'

import { IAppointment } from '@/interfaces/ComponentsInterfaces/Appointment'
import { fetchUserAppointmentsTest } from '@/server/Appointment/appointmentsApi'

import { useEffect, useState } from 'react'

const useAppointmentData = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentData = await fetchUserAppointmentsTest('test', 'test')

        if (!Array.isArray(appointmentData)) {
          throw new Error('Datos no válidos recibidos del servidor')
        }

        setAppointments(appointmentData)
      } catch (error) {
        console.error('Error al obtener los datos de la cita', error)
        setError('Error al obtener los datos de la cita')
      }
    }

    fetchData()
  }, [])

  return { appointments, error }
}

export default useAppointmentData
