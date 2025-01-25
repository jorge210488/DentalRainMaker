import { Appointment } from "@/app/patientDashboard/appointments/page"

type AppointmentCardProps = {
  appointment: Appointment
}

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  return (
    <div className='flex items-center justify-between rounded-lg bg-white p-4 shadow-md'>
      <div>
        <p
          className={`text-sm ${
            appointment.paymentStatus === 'Pending'
              ? 'text-red-500'
              : 'text-green-500'
          }`}
        >
          {appointment.paymentStatus === 'Pending'
            ? 'Payment pending'
            : 'Paid'}
        </p>
        <h2 className='text-lg font-bold'>{appointment.doctor}</h2>
        <p className='text-sm text-gray-600'>{appointment.specialty}</p>
        <p className='text-sm text-gray-600'>Patient: {appointment.patient}</p>
        <p className='text-sm text-gray-600'>
          {appointment.date} - {appointment.time}
        </p>
        <p className='text-sm text-gray-600'>
          {appointment.location} - {appointment.office}
        </p>
      </div>
      {appointment.paymentStatus === 'Pending' && (
        <div className='flex flex-col items-end gap-2'>
          <button className='rounded-lg border border-green-600 px-4 py-1 text-green-600 hover:bg-green-100'>
            Pay
          </button>
        </div>
      )}
    </div>
  )
}

export default AppointmentCard
