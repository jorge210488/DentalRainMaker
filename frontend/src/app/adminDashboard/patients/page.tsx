'use client';

import { DashboardShell } from '@/components/AdminDashboard/dashboard-shell';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { fetchPatientsList } from '@/server/Patients/patientsApi';
import { Patient } from '@/interfaces/ComponentsInterfaces/Patient';
import { PatientList } from '@/components/AdminDashboard/Patients/PatientsList';
import { PatientModal } from '@/components/AdminDashboard/Patients/PatientModal';
import { PatientCreateModal } from '@/components/AdminDashboard/Patients/PatientCreateModal';
import { SearchAndSort } from '@/components/AdminDashboard/Patients/SearchAndSort';

export default function Home() {
  const [allPatients, setAllPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Búsqueda
  const [sortField, setSortField] = useState<"name" | "age" | null>(null); // Campo de ordenamiento
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null); // Orden ascendente o descendente

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [refreshPatients, setRefreshPatients] = useState(false);
  
  const { data: session } = useSession();
  const patientsPerPage = 10; // Number of items per page

  useEffect(() => {
    const initializePatients = async () => {
      try {
        if (session?.user?.token && session?.user?.clinicId) {
          const response = await fetchPatientsList(session.user.clinicId, session.user.token);
          setAllPatients(response);
          setFilteredPatients(response);
        }
      } catch (error) {
        console.error('Error initializing patients:', error);
      }
    };
    initializePatients();
  }, [session, refreshPatients]);

  const handleRefreshPatients = () => setRefreshPatients((prev) => !prev);

  // Manejar el cambio en la barra de búsqueda
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Manejar el cambio en el orden
  const handleSort = (field: "name" | "age") => {
    const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
  };

  // Filtrar y ordenar pacientes
  useEffect(() => {
    let updatedPatients = [...allPatients];

  // Filtro de búsqueda
  if (searchQuery) {
    updatedPatients = updatedPatients.filter((patient) =>
      patient.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Ordenamiento
  if (sortField && sortOrder) {
    updatedPatients.sort((a, b) => {
      const fieldA = sortField === "name" ? a.fullname : a.age;
      const fieldB = sortField === "name" ? b.fullname : b.age;

      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  setFilteredPatients(updatedPatients);
}, [searchQuery, sortField, sortOrder, allPatients]);


  


  return (
    <DashboardShell>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Patients List</h1>

        {/* Componente de búsqueda y ordenamiento */}
        <SearchAndSort
          searchQuery={searchQuery}
          onSearch={handleSearch}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />

        <PatientList 
          patients={filteredPatients} 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          patientsPerPage={patientsPerPage}
          setSelectedPatient={setSelectedPatient}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />

        {/* Modal for Patient Details */}
        {selectedPatient && (
          <PatientModal
            patient={selectedPatient}
            refreshPatient={handleRefreshPatients}
            closePatientModal={() => setSelectedPatient(null)}
            
            
          />
        )}

        {/* Modal for Create New Patient */}
        {isCreateModalOpen && (
          <PatientCreateModal
            onCreatePatient={handleRefreshPatients}
            closeCreateModal={() => setIsCreateModalOpen(false)}
          />
        )}

        

      </div>
    </DashboardShell>
  );
}
