'use client'

import { DashboardShell } from '@/components/AdminDashboard/dashboard-shell';
import { RootState } from '@/redux/store';
import { fetchPatientsList } from '@/server/Patients/patientsApi';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
  const clinics = useSelector((state: RootState) => state.clinics.clinics);
  const { data: session } = useSession()
  
  
    useEffect(() => {
      const initializePatients = async () => {
        try { 
          if(session?.user?.token){
            console.log(session.user);
            
            const patients: Patient[] = await fetchPatientsList(
              clinics[3]._id,
              2,
              10,
              session.user.token
            )
            console.log('patients fetched ', patients)
            setPatients(patients)
          }     
          
  
        } catch (error) {
          console.error('Error initializing patients:', error)
        }
      }
      initializePatients()
     }, [clinics])


  return (
    <DashboardShell>
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
    </DashboardShell>
    
  );
}
