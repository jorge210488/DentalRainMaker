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
  const [allPatients, setAllPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<"name" | "age" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null); // Paciente seleccionado para el modal
  const { data: session } = useSession();
  const patientsPerPage = 10; // Número de elementos por página
  
    useEffect(() => {
      const initializePatients = async () => {
        try { 
          if(session?.user?.token && session?.user?.clinicId){
            
            const response = await fetchPatientsList(
              session.user.clinicId,
              session.user.token
            )
            
            setAllPatients(response);
            setFilteredPatients(response);
          }     
          
  
        } catch (error) {
          console.error('Error initializing patients:', error)
        }
      }
      initializePatients()
     }, [session])


     
     useEffect(() => {
      let updatedPatients = [...allPatients];
  
      // Aplicar búsqueda
      if (searchQuery) {
        updatedPatients = updatedPatients.filter((patient) =>
          patient.fullname.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
  
      // Aplicar orden
      if (sortField && sortOrder) {
        updatedPatients.sort((a, b) => {
          if (sortField === "name") {
            return sortOrder === "asc"
              ? a.fullname.localeCompare(b.fullname)
              : b.fullname.localeCompare(a.fullname);
          } else if (sortField === "age") {
            return sortOrder === "asc" ? a.age - b.age : b.age - a.age;
          }
          return 0;
        });
      }
  
      setFilteredPatients(updatedPatients);
      setCurrentPage(1);// Reiniciar a la primera página después de aplicar filtros
    }, [searchQuery, sortField, sortOrder, allPatients]);


      // Obtener pacientes para la página actual
      const paginatedPatients = filteredPatients.slice(
        (currentPage - 1) * patientsPerPage,
        currentPage * patientsPerPage
      );

      const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);



     const handlePageChange = (newPage: number) => {
      if (newPage > 0 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };
  
    const handleSort = (field: "name" | "age") => {
      if (sortField === field) {
        // Alternar entre ascendente y descendente
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortField(field);
        setSortOrder("asc"); // Ordenar ascendente por defecto
      }
    };


    const openPatientModal = (patient: Patient) => {
      setSelectedPatient(patient);
    };
  
    const closePatientModal = () => {
      setSelectedPatient(null);
    };


  return (
    <DashboardShell>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Lista de Pacientes</h1>
        <div className="mb-4 flex items-center gap-4">
          {/* Barra de búsqueda */}
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="px-4 py-2 border rounded w-full"
            value={searchQuery}
            onChange={handleSearch}
          />
          {/* Botones de orden */}
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => handleSort("name")}
          >
            Ordenar por Nombre {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => handleSort("age")}
          >
            Ordenar por Edad {sortField === "age" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>
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
              {paginatedPatients.map((patient) => (
                <tr key={patient.remote_id} className="hover:bg-gray-100">
                  <td className="p-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => openPatientModal(patient)}
                    >
                      {patient.fullname}
                    </button>
                  </td>
                  <td className="p-2">{patient.age}</td>
                  <td className="p-2">{patient.insurance}</td>
                  <td className="p-2">{patient.nextVisit}</td>
                  <td className="p-2">{patient.lastVisit}</td>
                  <td className="p-2">{patient.activeTreatment ? "Sí" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Controles de paginación */}
          <div className="flex justify-center items-center mt-4">
            <button
              className="px-4 py-2 mx-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span className="px-4 py-2 mx-1">{`Página ${currentPage} de ${totalPages}`}</span>
            <button
              className="px-4 py-2 mx-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>

        </div>
        {selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
                onClick={closePatientModal}
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">Detalles del Paciente</h2>
              <p>
                <strong>Nombre:</strong> {selectedPatient.fullname}
              </p>
              <p>
                <strong>Edad:</strong> {selectedPatient.age}
              </p>
              <p>
                <strong>Seguro:</strong> {selectedPatient.insurance}
              </p>
              <p>
                <strong>Próxima Visita:</strong> {selectedPatient.nextVisit}
              </p>
              <p>
                <strong>Última Visita:</strong> {selectedPatient.lastVisit}
              </p>
              <p>
                <strong>Tratamiento Activo:</strong>{" "}
                {selectedPatient.activeTreatment ? "Sí" : "No"}
              </p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={closePatientModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
    
  );
}
