import AppointmentCard from './AppointmentCard'
import { Appointment } from '@/app/pages/patientDashboard/appointments/page'
import BeatLoader from 'react-spinners/BeatLoader'
type AppointmentsListProps = {
  appointments: Appointment[]
  loading: boolean
}

const AppointmentsList = ({ appointments, loading }: AppointmentsListProps) => {
  return (
    <div className='space-y-4'>
      {loading === true ? (
        <div className='flex justify-center'>
          <BeatLoader color='#2563EB' />
        </div>
      ) : appointments.length === 0 ? (
        <div className='flex justify-center'>
          <p>No appointments found</p>
        </div>
      ) : (
        appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.remote_id}
            appointment={appointment}
          />
        ))
      )}
    </div>
  )
}

export default AppointmentsList
