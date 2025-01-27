import { Appointment } from "@/app/patientDashboard/appointments/page"
import { RootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";

type AppointmentCardProps = {
  appointment: Appointment
}

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const { data: session } = useSession();
  const {clinics} = useSelector((state: RootState) => state.clinics);
  const clinic = Array.isArray(clinics) ? clinics.find((clinic) => clinic._id === session?.user.clinicId) : null;

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
          {appointment.paymentStatus === 'Pending' ? 'Payment pending' : 'Paid'}
        </p>
        <h2 className='text-lg font-bold'>Doctor: {appointment.doctor}</h2>
        <p className='text-sm text-gray-600'>
          Operator: {appointment.operator}
        </p>
        <p className='text-sm text-gray-600'>
          Date: {appointment.date} - time: {appointment.time}
        </p>
        <p className='text-sm text-gray-600'>
          Location: {clinic?.clinic_name}
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
