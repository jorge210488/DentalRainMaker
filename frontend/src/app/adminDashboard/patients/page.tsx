'use client'

import { DashboardShell } from '@/components/AdminDashboard/dashboard-shell';
import { fetchPatientsList } from '@/server/Patients/patientsApi';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { FormData } from '../../types/auth'

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
  const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<FormData>()
  const [allPatients, setAllPatients] = useState<Patient[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<"name" | "age" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null); // Paciente seleccionado para el modal
  const { data: session } = useSession();
  const [refreshPatients, setRefreshPatients] = useState(false);
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
     }, [session,refreshPatients])


     
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

    

    const onSubmit = async (data: any) => {
      const realData = {
        ...data,
        password: "Prueba123!",
        confirmPassword: "Prueba123!",
        provider: "local",
        clinic_id: session?.user.clinicId,
      };
  
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(realData),
          }
        );
  
        const result = await response.json();
  
        if (response.status === 201) {
          Swal.fire({
            title: "Success",
            text: "The patient has been created successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
          // Activa la actualización de la lista de pacientes
          setRefreshPatients((prev) => !prev);
          // reset();
          setIsCreateModalOpen(false);
        } else {
          Swal.fire({
            title: "Error",
            text: result.message || "An error occurred while creating the patient.",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Connection Error",
          text: "Failed to connect to the server. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);


  return (
    <DashboardShell>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Patients List</h1>
        <div className="flex justify-end mb-4">
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            New Patient
          </button>
        </div>
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
            Sort by Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => handleSort("age")}
          >
            Sort by age {sortField === "age" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">Name</th>
                <th className="p-2">Age</th>
                <th className="p-2">Insurance</th>
                <th className="p-2">Next Visit</th>
                <th className="p-2">Last Visit</th>
                <th className="p-2">Treatment active</th>
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
              Previous
            </button>
            <span className="px-4 py-2 mx-1">{`Página ${currentPage} de ${totalPages}`}</span>
            <button
              className="px-4 py-2 mx-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
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
                <strong>Name:</strong> {selectedPatient.fullname}
              </p>
              <p>
                <strong>Age:</strong> {selectedPatient.age}
              </p>
              <p>
                <strong>Insurance:</strong> {selectedPatient.insurance}
              </p>
              <p>
                <strong>Next Visit:</strong> {selectedPatient.nextVisit}
              </p>
              <p>
                <strong>Last Visit:</strong> {selectedPatient.lastVisit}
              </p>
              <p>
                <strong>Treatment active:</strong>{" "}
                {selectedPatient.activeTreatment ? "Sí" : "No"}
              </p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={closePatientModal}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Modal para Crear Paciente */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
                onClick={closeCreateModal}
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">Crear Nuevo Paciente</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                <div>
                  <label htmlFor="familyName" className="block font-medium">
                    Family Name
                  </label>
                  <input
                    id="familyName"
                    className="w-full rounded border p-2"
                    {...register("family_name", { required: "El apellido es obligatorio" })}
                  />
                  {errors.family_name && (
                    <p className="text-sm text-red-500">{errors.family_name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="givenName" className="block font-medium">
                    Name
                  </label>
                  <input
                    id="givenName"
                    className="w-full rounded border p-2"
                    {...register("given_name", { required: "El nombre es obligatorio" })}
                  />
                  {errors.given_name && (
                    <p className="text-sm text-red-500">{errors.given_name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded border p-2"
                    {...register("email", {
                      required: "El email es obligatorio",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "El formato del email no es válido",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Create Patient
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
    
  );
}
