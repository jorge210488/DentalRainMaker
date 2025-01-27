// pages/index.tsx
import Link from 'next/link';

type Patient = {
  remote_id: number;
  name: string;
  age: number;
  insurance: string;
  nextVisit: string;
  lastVisit: string;
  activeTreatment: boolean;
};

const patients: Patient[] = [
  // {
  //   id: 1,
  //   name: 'John Doe',
  //   age: 34,
  //   insurance: 'HealthPlus',
  //   nextVisit: '2024-03-15',
  //   lastVisit: '2023-12-10',
  //   activeTreatment: true,
  // },
  // {
  //   id: 2,
  //   name: 'Jane Smith',
  //   age: 29,
  //   insurance: 'DentalCare',
  //   nextVisit: '2024-04-20',
  //   lastVisit: '2023-11-05',
  //   activeTreatment: false,
  // },
  // {
  //   id: 3,
  //   name: 'Carlos Pérez',
  //   age: 45,
  //   insurance: 'VidaSalud',
  //   nextVisit: '2024-05-12',
  //   lastVisit: '2023-09-15',
  //   activeTreatment: true,
  // },
  // {
  //   id: 4,
  //   name: 'Anna Kowalski',
  //   age: 32,
  //   insurance: 'HealthPlus',
  //   nextVisit: '2024-06-22',
  //   lastVisit: '2023-10-08',
  //   activeTreatment: false,
  // },
  // {
  //   id: 5,
  //   name: 'Liam Brown',
  //   age: 50,
  //   insurance: 'CareSecure',
  //   nextVisit: '2024-03-30',
  //   lastVisit: '2023-07-25',
  //   activeTreatment: true,
  // },
  // {
  //   id: 6,
  //   name: 'Olivia Johnson',
  //   age: 37,
  //   insurance: 'MediCare',
  //   nextVisit: '2024-02-14',
  //   lastVisit: '2023-12-01',
  //   activeTreatment: true,
  // },
  // {
  //   id: 7,
  //   name: 'Noah Williams',
  //   age: 41,
  //   insurance: 'VidaSalud',
  //   nextVisit: '2024-01-18',
  //   lastVisit: '2023-08-21',
  //   activeTreatment: false,
  // },
  // {
  //   id: 8,
  //   name: 'Emma Davis',
  //   age: 28,
  //   insurance: 'HealthPlus',
  //   nextVisit: '2024-07-05',
  //   lastVisit: '2023-10-30',
  //   activeTreatment: true,
  // },
  // {
  //   id: 9,
  //   name: 'Sophia Martinez',
  //   age: 33,
  //   insurance: 'CareSecure',
  //   nextVisit: '2024-08-12',
  //   lastVisit: '2023-06-18',
  //   activeTreatment: false,
  // },
];

export default function Home() {
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
                    {patient.name}
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
