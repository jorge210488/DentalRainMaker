'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSession } from 'next-auth/react'
import { fetchNotificationsByUser } from '@/server/notifications'
import {
  setNotifications,
  clearNotifications,
} from '@/redux/slices/notificationsSlice'
import { fetchContactById } from '@/server/contacts'
import { setUser, clearUser } from '@/redux/slices/userSlice'
import { getAppointmentsByContactId } from '@/server/appointments'
import {
  setAppointments,
  clearAppointments,
} from '@/redux/slices/appointmentsSlice'
import { IAppointment } from '@/interfaces/ComponentsInterfaces/Appointment'

const SessionAppInitializer = () => {
  const dispatch = useDispatch()
  const { data: session, status } = useSession()

  useEffect(() => {
    console.log('Session Status:', status)
    console.log('Session Data:', session)

    const initializeSessionData = async () => {
      if (
        status === 'authenticated' &&
        session?.user?.token &&
        session?.user?.userId &&
        typeof session.user.clinicId === 'string'
      ) {
        let notifications = []
        let userData = null
        let appointments: IAppointment[] = []

        // 🔹 Intentar obtener notificaciones
        try {
          notifications = await fetchNotificationsByUser(
            session.user.clinicId,
            session.user.userId,
            session.user.token,
          )
          dispatch(setNotifications(notifications))
        } catch (error) {
          console.error('Error fetching notifications:', error)
          dispatch(clearNotifications())
        }

        // 🔹 Intentar obtener datos del usuario
        try {
          userData = await fetchContactById(
            session.user.clinicId,
            session.user.userId,
            session.user.token,
          )
          dispatch(setUser(userData))
        } catch (error) {
          console.error('Error fetching user data:', error)
          dispatch(clearUser())
        }

        // 🔹 Intentar obtener citas (appointments)
        try {
          const appointmentsResponse = await getAppointmentsByContactId(
            session.user.clinicId,
            session.user.userId,
            session.user.token,
          )

          // 🔹 Convertir la respuesta al formato de `IAppointment`
          appointments = appointmentsResponse.map((appointment: any) => ({
            name: appointment.name,
            remote_id: appointment.remote_id,
            contact_id: appointment.contact_id,
            contact: appointment.contact,
            location: appointment.location,
            start_time: appointment.start_time,
            end_time: appointment.end_time,
            wall_start_time: appointment.wall_start_time,
            wall_end_time: appointment.wall_end_time,
            time_zone: appointment.time_zone,
            providers: appointment.providers,
            scheduler: appointment.scheduler,
            appointment_type_id: appointment.appointment_type_id,
            operatory: appointment.operatory,
            resources: appointment.resources,
            short_description: appointment.short_description,
            notes: appointment.notes,
            confirmed: appointment.confirmed,
            cancelled: appointment.cancelled,
            completed: appointment.completed,
            broken: appointment.broken,
            additional_data: appointment.additional_data,
            create_time: appointment.create_time,
            update_time: appointment.update_time,
          }))

          dispatch(setAppointments(appointments))
        } catch (error) {
          console.error('Error fetching appointments:', error)
          dispatch(clearAppointments())
        }
      } else if (status === 'unauthenticated') {
        dispatch(clearNotifications())
        dispatch(clearUser())
        dispatch(clearAppointments())
      }
    }

    initializeSessionData()
  }, [dispatch, session, status])

  return null
}

export default SessionAppInitializer
