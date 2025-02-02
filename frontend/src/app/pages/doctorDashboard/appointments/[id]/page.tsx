'use client'
import { useParams } from 'next/navigation'

const appointmentData: {
  [key: number]: {
    client: string
    doctor: string
    date: string
    diagnosis: string
    prescription: string[]
    treatmentsPerformed: string[]
    dentalImages: string[]
  }
} = {
  101: {
    client: 'John Doe',
    doctor: 'Dr. Smith',
    date: '2023-12-10',
    diagnosis: 'Maloclusión leve',
    prescription: ['Ibuprofeno 200mg', 'Enjuague bucal antibacterial'],
    treatmentsPerformed: ['Ajuste de brackets'],
    dentalImages: ['radiografia1.jpg', 'radiografia2.jpg'],
  },
  102: {
    client: 'John Doe',
    doctor: 'Dr. Adams',
    date: '2023-10-05',
    diagnosis: 'Limpieza regular',
    prescription: ['Pasta dental con flúor', 'Hilo dental'],
    treatmentsPerformed: ['Limpieza profunda'],
    dentalImages: ['limpieza1.jpg'],
  },
}

export default function AppointmentDetailPage() {
  const { id } = useParams()
  const appointment = appointmentData[Number(id)]

  if (!appointment) {
    return <div className='p-6'>Cita no encontrada.</div>
  }

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='mb-4 text-2xl font-bold'>Detalle de la Cita</h1>
      <div className='mb-6 rounded-lg bg-white p-4 shadow'>
        <h2 className='mb-2 text-lg font-semibold'>Información de la Cita</h2>
        <p>
          <strong>Cliente:</strong> {appointment.client}
        </p>
        <p>
          <strong>Doctor:</strong> {appointment.doctor}
        </p>
        <p>
          <strong>Fecha:</strong> {appointment.date}
        </p>
        <p>
          <strong>Diagnóstico:</strong> {appointment.diagnosis}
        </p>
      </div>

      <div className='mb-6 rounded-lg bg-white p-4 shadow'>
        <h2 className='mb-2 text-lg font-semibold'>Receta</h2>
        <ul className='list-disc pl-5'>
          {appointment.prescription.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className='mb-6 rounded-lg bg-white p-4 shadow'>
        <h2 className='mb-2 text-lg font-semibold'>Tratamientos Realizados</h2>
        <ul className='list-disc pl-5'>
          {appointment.treatmentsPerformed.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className='rounded-lg bg-white p-4 shadow'>
        <h2 className='mb-2 text-lg font-semibold'>Placas Dentales</h2>
        <div className='grid grid-cols-2 gap-4'>
          {appointment.dentalImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Placa dental ${index + 1}`}
              className='h-auto w-full rounded'
            />
          ))}
        </div>
      </div>
    </div>
  )
}
