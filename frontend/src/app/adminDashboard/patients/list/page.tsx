'use client'
import { fetchPatientsList } from '@/server/Patients/patientsApi';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Patient = {
  remote_id: number;
  fullname: string;
  age: number;
  insurance: string;
  nextVisit: string;
  lastVisit: string;
  activeTreatment: boolean;
};


export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);
  
    useEffect(() => {
      const initializePatients = async () => {
        try {
          console.log('Fetching patients...');
          
          const patients: Patient[] = await fetchPatientsList(
            'fb8ce23f-8fed-4911-8fdf-ed4a5c9dd306',
            1,
            5,
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZmY0MDRkYS03OTVhLTRhMzAtOTZmYy00ZWVkM2EzZjdlM2MiLCJ1c2VyX2lkIjoiODA4IiwidHlwZSI6IkFETUlOIiwiZW1haWwiOiJqb3NlQGdtYWlsLmNvbSIsImNsaW5pY19pZCI6ImZiOGNlMjNmLThmZWQtNDkxMS04ZmRmLWVkNGE1YzlkZDMwNiIsInZpZXdzIjpbIkFMTF9WSUVXUyJdLCJpYXQiOjE3Mzc0MjY3NjksImV4cCI6MTczNzQ0MTE2OX0.rJch05nt6nbBHsZes6AD0vq75OjyFUbOwQf4HuL8UXo'
          )
          console.log('patients fetched ', patients)
          setPatients(patients)
  
        } catch (error) {
          console.error('Error initializing patients:', error)
        }
      }
      initializePatients()
     }, [])


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Pacientes</h1>
      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">Nombre</th>
              <th className="p-2">Edad</th>
              <th className="p-2">Seguro</th>
              <th className="p-2">Próxima Visita</th>
              <th className="p-2">Última Visita</th>
              <th className="p-2">Tratamiento Activo</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.remote_id} className="hover:bg-gray-100">
                <td className="p-2">
                  <Link href={`/adminDashboard/patients/${patient.remote_id}`} className="text-blue-500 hover:underline">
                    {patient.fullname}
                  </Link>
                </td>
                <td className="p-2">{patient.age}</td>
                <td className="p-2">{patient.insurance}</td>
                <td className="p-2">{patient.nextVisit}</td>
                <td className="p-2">{patient.lastVisit}</td>
                <td className="p-2">{patient.activeTreatment ? 'Sí' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
