import AppointmentCard from './AppointmentCard'
import { Appointment } from "@/app/patientDashboard/appointments/page"

type AppointmentsListProps = {
  appointments: Appointment[]
}

const AppointmentsList = ({ appointments }: AppointmentsListProps) => {
  return (
    <div className='space-y-4'>
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment.remote_id} appointment={appointment} />
      ))}
    </div>
  )
}

export default AppointmentsList
