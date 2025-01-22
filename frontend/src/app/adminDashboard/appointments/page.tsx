'use client'
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DashboardShell } from '@/components/AdminDashboard/dashboard-shell';

type Appointment = {
  id: number;
  date: string;
  patientName: string;
  diagnosis: string;
};

type DoctorAppointments = {
  id: number;
  name: string;
  specialty: string;
  appointments: Appointment[];
};

const doctorAppointmentsData: { [key: number]: DoctorAppointments } = {
  1: {
    id: 1,
    name: 'Dr. Smith',
    specialty: 'Ortodoncia',
    appointments: [
      {
        id: 101,
        date: '2023-12-10',
        patientName: 'John Doe',
        diagnosis: 'Maloclusión leve',
      },
      {
        id: 102,
        date: '2023-10-05',
        patientName: 'Jane Roe',
        diagnosis: 'Limpieza regular',
      },
    ],
  },
};

export default function DoctorAppointmentsPage() {
  
//   const { id } = useParams();
//   const doctor = doctorAppointmentsData[Number(id)];
    const doctor = doctorAppointmentsData[1];
//   if (!doctor) {
//     return <div className="p-6">Doctor no encontrado.</div>;
//   }

  return (
    <DashboardShell>
      <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Citas del Doctor</h1>
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Información del Doctor</h2>
        <p><strong>Nombre:</strong> {doctor.name}</p>
        <p><strong>Especialidad:</strong> {doctor.specialty}</p>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Listado de Citas</h2>
        <ul className="divide-y divide-gray-200">
          {doctor.appointments.map((appointment) => (
            <li key={appointment.id} className="py-2">
              <Link href={`/adminDashboard/appointments/${appointment.id}`} className="text-blue-600 hover:underline">
                
                  <p><strong>Fecha:</strong> {appointment.date}</p>
                  <p><strong>Paciente:</strong> {appointment.patientName}</p>
                  <p><strong>Diagnóstico:</strong> {appointment.diagnosis}</p>
                
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </DashboardShell>
    
  );
}
