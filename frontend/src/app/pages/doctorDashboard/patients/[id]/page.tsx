'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'

type Treatment = {
  type: string
  cost: number
  progress: number
  exams: string[]
}

type Appointment = {
  id: number
  date: string
  doctor: string
  diagnosis: string
}

type PatientDetail = {
  id: number
  name: string
  age: number
  insurance: string
  treatments: Treatment
  appointments: Appointment[]
}

const patientData: { [key: number]: PatientDetail } = {
  1: {
    id: 1,
    name: 'John Doe',
    age: 34,
    insurance: 'HealthPlus',
    treatments: {
      type: 'Ortodoncia',
      cost: 1200,
      progress: 75,
      exams: ['Radiografía inicial', 'Molde dental'],
    },
    appointments: [
      {
        id: 101,
        date: '2023-12-10',
        doctor: 'Dr. Smith',
        diagnosis: 'Maloclusión leve',
      },
      {
        id: 102,
        date: '2023-10-05',
        doctor: 'Dr. Adams',
        diagnosis: 'Limpieza regular',
      },
    ],
  },
  2: {
    id: 2,
    name: 'Jane Smith',
    age: 29,
    insurance: 'MediCare',
    treatments: {
      type: 'Blanqueamiento dental',
      cost: 500,
      progress: 40,
      exams: ['Fotografía dental', 'Molde inicial'],
    },
    appointments: [
      {
        id: 201,
        date: '2023-11-20',
        doctor: 'Dr. Adams',
        diagnosis: 'Sensibilidad dental',
      },
      {
        id: 202,
        date: '2023-08-15',
        doctor: 'Dr. Lee',
        diagnosis: 'Limpieza profunda',
      },
    ],
  },
  3: {
    id: 3,
    name: 'Carlos Pérez',
    age: 45,
    insurance: 'VidaSalud',
    treatments: {
      type: 'Implante dental',
      cost: 3000,
      progress: 60,
      exams: ['Radiografía panorámica', 'Evaluación ósea'],
    },
    appointments: [
      {
        id: 301,
        date: '2023-09-15',
        doctor: 'Dr. Smith',
        diagnosis: 'Pérdida de molar',
      },
      {
        id: 302,
        date: '2023-06-10',
        doctor: 'Dr. Brown',
        diagnosis: 'Dolor dental severo',
      },
    ],
  },
  4: {
    id: 4,
    name: 'Anna Kowalski',
    age: 32,
    insurance: 'HealthPlus',
    treatments: {
      type: 'Ortodoncia',
      cost: 2000,
      progress: 20,
      exams: ['Molde dental', 'Radiografía inicial'],
    },
    appointments: [
      {
        id: 401,
        date: '2023-10-08',
        doctor: 'Dr. Carter',
        diagnosis: 'Maloclusión moderada',
      },
      {
        id: 402,
        date: '2023-07-02',
        doctor: 'Dr. Smith',
        diagnosis: 'Evaluación inicial',
      },
    ],
  },
  5: {
    id: 5,
    name: 'Liam Brown',
    age: 50,
    insurance: 'CareSecure',
    treatments: {
      type: 'Puente dental',
      cost: 2500,
      progress: 85,
      exams: ['Radiografía panorámica', 'Medición dental'],
    },
    appointments: [
      {
        id: 501,
        date: '2023-07-25',
        doctor: 'Dr. Adams',
        diagnosis: 'Pérdida de piezas dentales',
      },
      {
        id: 502,
        date: '2023-05-10',
        doctor: 'Dr. Lee',
        diagnosis: 'Consulta de seguimiento',
      },
    ],
  },
  6: {
    id: 6,
    name: 'Olivia Johnson',
    age: 37,
    insurance: 'MediCare',
    treatments: {
      type: 'Blanqueamiento dental',
      cost: 700,
      progress: 55,
      exams: ['Fotografía dental', 'Limpieza inicial'],
    },
    appointments: [
      {
        id: 601,
        date: '2023-12-01',
        doctor: 'Dr. Smith',
        diagnosis: 'Manchas dentales leves',
      },
      {
        id: 602,
        date: '2023-09-15',
        doctor: 'Dr. Carter',
        diagnosis: 'Sensibilidad dental',
      },
    ],
  },
  7: {
    id: 7,
    name: 'Noah Williams',
    age: 41,
    insurance: 'VidaSalud',
    treatments: {
      type: 'Extracción dental',
      cost: 400,
      progress: 100,
      exams: ['Radiografía inicial', 'Evaluación dental'],
    },
    appointments: [
      {
        id: 701,
        date: '2023-08-21',
        doctor: 'Dr. Brown',
        diagnosis: 'Caries profunda',
      },
      {
        id: 702,
        date: '2023-05-12',
        doctor: 'Dr. Smith',
        diagnosis: 'Dolor de muela severo',
      },
    ],
  },
  8: {
    id: 8,
    name: 'Emma Davis',
    age: 28,
    insurance: 'HealthPlus',
    treatments: {
      type: 'Ortodoncia',
      cost: 2200,
      progress: 70,
      exams: ['Radiografía inicial', 'Molde dental'],
    },
    appointments: [
      {
        id: 801,
        date: '2023-10-30',
        doctor: 'Dr. Adams',
        diagnosis: 'Alineación dental irregular',
      },
      {
        id: 802,
        date: '2023-06-15',
        doctor: 'Dr. Carter',
        diagnosis: 'Evaluación inicial',
      },
    ],
  },
  9: {
    id: 9,
    name: 'Sophia Martinez',
    age: 33,
    insurance: 'CareSecure',
    treatments: {
      type: 'Implante dental',
      cost: 3500,
      progress: 50,
      exams: ['Evaluación ósea', 'Radiografía panorámica'],
    },
    appointments: [
      {
        id: 901,
        date: '2023-06-18',
        doctor: 'Dr. Smith',
        diagnosis: 'Pérdida de molar',
      },
      {
        id: 902,
        date: '2023-04-25',
        doctor: 'Dr. Brown',
        diagnosis: 'Inflamación severa',
      },
    ],
  },
}

export default function PatientDetailPage() {
  const { id } = useParams()
  const patient = patientData[Number(id)]

  if (!patient) {
    return <div className='p-6'>Paciente no encontrado.</div>
  }

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='mb-4 text-2xl font-bold'>Detalle del Paciente</h1>
      <div className='mb-6 rounded-lg bg-white p-4 shadow'>
        <h2 className='mb-2 text-lg font-semibold'>Información del Paciente</h2>
        <p>
          <strong>Nombre:</strong> {patient.name}
        </p>
        <p>
          <strong>Edad:</strong> {patient.age}
        </p>
        <p>
          <strong>Seguro:</strong> {patient.insurance}
        </p>
      </div>

      <div className='mb-6 rounded-lg bg-white p-4 shadow'>
        <h2 className='mb-2 text-lg font-semibold'>Tratamiento Actual</h2>
        <p>
          <strong>Tipo:</strong> {patient.treatments.type}
        </p>
        <p>
          <strong>Costo:</strong> ${patient.treatments.cost}
        </p>
        <p>
          <strong>Progreso:</strong> {patient.treatments.progress}%
        </p>
        <div>
          <h3 className='text-md mt-2 font-medium'>Exámenes:</h3>
          <ul className='list-disc pl-5'>
            {patient.treatments.exams.map((exam, index) => (
              <li key={index}>{exam}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className='rounded-lg bg-white p-4 shadow'>
        <h2 className='mb-2 text-lg font-semibold'>Historial de Citas</h2>
        <ul className='divide-y divide-gray-200'>
          {patient.appointments.map((appointment) => (
            <li key={appointment.id} className='py-2'>
              <Link
                href={`/adminDashboard/appointments/${appointment.id}`}
                className='text-blue-600 hover:underline'
              >
                <p>
                  <strong>Fecha:</strong> {appointment.date}
                </p>
                <p>
                  <strong>Doctor:</strong> {appointment.doctor}
                </p>
                <p>
                  <strong>Diagnóstico:</strong> {appointment.diagnosis}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
