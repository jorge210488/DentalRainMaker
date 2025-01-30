'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, Bell } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { IAppointment } from '@/interfaces/ComponentsInterfaces/Appointment'

export function MetricsCards() {
  // 🔹 Obtener citas desde Redux
  const appointments = useSelector(
    (state: RootState) => state.appointments.appointments,
  )

  // 🔹 Obtener la fecha de hoy
  const today = new Date()

  // 🔹 Obtener la próxima cita (la más cercana a la fecha actual)
  const nextAppointment = appointments
    .filter((appointment) => appointment.start_time && new Date(appointment.start_time) >= today)
    .sort(
      (a, b) =>
        new Date(a.start_time ?? 0).getTime() - new Date(b.start_time ?? 0).getTime(),
    )[0]

  // 🔹 Contar la cantidad de citas futuras
  const upcomingAppointmentsCount = appointments.filter(
    (appointment) => appointment.start_time && new Date(appointment.start_time) >= today,
  ).length

  return (
    <div className='grid gap-4 md:grid-cols-3'>
      {/* 📅 Tarjeta de la Próxima Cita */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Next Appointment
          </CardTitle>
          <Calendar className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          {nextAppointment ? (
            <>
              <div className='text-2xl font-bold'>
                {nextAppointment.start_time && new Date(nextAppointment.start_time).toLocaleDateString(
                  'en-US',
                  {
                    month: 'short',
                    day: 'numeric',
                  },
                )}
              </div>
              <p className='text-muted-foreground text-xs'>
                {nextAppointment.short_description || 'Regular Checkup'}
              </p>
            </>
          ) : (
            <>
              <div className='text-2xl font-bold'>No Upcoming Appointments</div>
              <p className='text-muted-foreground text-xs'>
                Schedule your next visit soon.
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {/* ⏳ Tarjeta de Progreso del Tratamiento */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Treatment Progress
          </CardTitle>
          <Clock className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>75%</div>
          <p className='text-muted-foreground text-xs'>
            Orthodontic Treatment Plan
          </p>
        </CardContent>
      </Card>

      {/* 🔔 Tarjeta de Recordatorios */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Reminders</CardTitle>
          <Bell className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{upcomingAppointmentsCount}</div>
          <p className='text-muted-foreground text-xs'>
            {upcomingAppointmentsCount > 0
              ? 'Upcoming appointments & tasks'
              : 'No upcoming tasks'}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
