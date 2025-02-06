import { IAppointment } from '@/interfaces/ComponentsInterfaces/Appointment'
import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

type AppointmentListProps = {
  appointments: IAppointment[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  appointmentsPerPage: number
  setSelectedAppointment: React.Dispatch<React.SetStateAction<IAppointment | null>>
}

export const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  currentPage,
  setCurrentPage,
  appointmentsPerPage,
  setSelectedAppointment,

}) => {

   
  const totalPages = Math.ceil(appointments.length / appointmentsPerPage)

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const paginatedAppointments = appointments.slice(
    (currentPage - 1) * appointmentsPerPage,
    currentPage * appointmentsPerPage,
  )

  return (
    <div>
      <table className='w-full border-collapse text-left'>
        <thead>
          <tr className='border-b'>
            <th className='p-2'>Id</th>
            <th className='p-2'>Patient</th>
            <th className='p-2'>Start time</th>
            <th className='p-2'>Doctor</th>
            <th className='p-2'>Operador</th>
            <th className='p-2'>Confirmed?</th>
            <th className='p-2'>Cancelled?</th>
            <th className='p-2'>Completed?</th>
            <th className='p-2'>Broken?</th>
          </tr>
        </thead>
        {paginatedAppointments.length === 0 ? (
          <ClipLoader
            color='blue'
            className='relative left-[900%] sm:right-[50%]'
          />
        ) : (
          <tbody>
            {paginatedAppointments.map((appointment) => (
              <tr key={appointment.remote_id} className='hover:bg-gray-100'>
                <td className='p-2'>
                  <button
                    className='text-blue-500 hover:underline'
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    {appointment.remote_id}
                  </button>
                </td>
                <td className='p-2'>
                  {appointment.contact.given_name +
                    ' ' +
                    appointment.contact.family_name}
                </td>
                <td className='p-2'>{appointment.wall_start_time}</td>
                <td className='p-2'>{appointment.doctor}</td>
                <td className='p-2'>{appointment.operator}</td>
                <td className='p-2'>{appointment.confirmed ? 'Yes' : 'No'}</td>
                <td className='p-2'>{appointment.cancelled ? 'Yes' : 'No'}</td>
                <td className='p-2'>{appointment.completed ? 'Yes' : 'No'}</td>
                <td className='p-2'>{appointment.broken ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      <div className='mt-4 flex items-center justify-center'>
        <button
          className='mx-1 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className='mx-1 px-4 py-2'>{`Página ${currentPage} de ${totalPages}`}</span>
        <button
          className='mx-1 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}
