'use client'

import { DashboardShell } from '@/components/AdminDashboard/dashboard-shell';
import { fetchPatientsList } from '@/server/Patients/patientsApi';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { FormData } from '../../types/auth'

type Address = {
  street_address: string,
  city: string,
  state: string,
  postal_code: string,
  country_code: string,
  type: string
}

type Phone_Number = {
  number: string,
  type: string
}

type Email_Address = {
  address: string,
  type: string
}

type Provider = {
  name: string,
  remote_id: string,
  type: string,
  display_name: string
}

type Opt_Ins = {
  sms: boolean,
  email: boolean
}

type Patient = {
  type:string;
  remote_id: number;
  given_name: string;
  family_name: string;
  preferred_name: string;
  fullname: string;
  birth_date: string;
  age: number;
  gender: string;
  notes: string;
  addresses: Address[];
  phone_numbers: Phone_Number[];
  primary_phone_number: string;
  email_addresses: Email_Address[];
  primary_email_address: string;
  state: string;
  additional_data: object;
  preferred_provider: Provider;
  insurance: string;
  first_visit: string;
  nextVisit: string;
  lastVisit: string;
  guarantor: string;
  opt_ins: Opt_Ins;
  activeTreatment: boolean;
  create_time: string;
  update_time: string;
};


export default function Home() {
  const {
      register,
      reset,
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
      console.log("email ingresado",data);
      
      const realData = {
        given_name:data.given_name,
        family_name:data.family_name,
        email_addresses: [{address:data.email, type:"OTHER"}],
      };
  
      try {
        if(session?.user?.clinicId){
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/contacts?clinicId=${encodeURIComponent(session.user.clinicId)}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.user.token}`,
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
            reset();
            setIsCreateModalOpen(false);
          } else {
            Swal.fire({
              title: "Error",
              text: result.message || "An error occurred while creating the patient.",
              icon: "error",
              confirmButtonText: "Try Again",
            });
          }

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
        {/* {selectedPatient && (
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
                <strong>Gender:</strong> {selectedPatient.gender}
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
        )} */}

        {/* Modal para Detalle Paciente */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 max-h-screen w-full max-w-4xl shadow-lg relative overflow-y-auto">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
                onClick={closePatientModal}
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center">Detalles del Paciente</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Type:</strong> {selectedPatient.type ?? "null"}</p>
                  <p><strong>Given Name:</strong> {selectedPatient.given_name ?? "null"}</p>
                  <p><strong>Family Name:</strong> {selectedPatient.family_name ?? "null"}</p>
                  <p><strong>Preferred Name:</strong> {selectedPatient.preferred_name ?? "null"}</p>
                  <p><strong>Gender:</strong> {selectedPatient.gender ?? "null"}</p>
                  <p><strong>Birth Date:</strong> {selectedPatient.birth_date ?? "null"}</p>
                  <p><strong>Notes:</strong> {selectedPatient.notes ?? "null"}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold">Addresses</h3>
                  {selectedPatient.addresses?.length > 0 ? (
                    selectedPatient.addresses.map((address, index) => (
                      <div key={index} className="mb-2">
                        <p><strong>Type:</strong> {address.type ?? "null"}</p>
                        <p><strong>Street:</strong> {address.street_address ?? "null"}</p>
                        <p><strong>City:</strong> {address.city ?? "null"}</p>
                        <p><strong>State:</strong> {address.state ?? "null"}</p>
                        <p><strong>Postal Code:</strong> {address.postal_code ?? "null"}</p>
                        <p><strong>Country Code:</strong> {address.country_code ?? "null"}</p>
                      </div>
                    ))
                  ) : (
                    <p>No addresses available.</p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold">Phone Numbers</h3>
                  {selectedPatient.phone_numbers?.length > 0 ? (
                    selectedPatient.phone_numbers.map((phone, index) => (
                      <div key={index} className="mb-2">
                        <p><strong>Type:</strong> {phone.type ?? "null"}</p>
                        <p><strong>Number:</strong> {phone.number ?? "null"}</p>
                      </div>
                    ))
                  ) : (
                    <p>No phone numbers available.</p>
                  )}
                  <p><strong>Primary Phone Number:</strong> {selectedPatient.primary_phone_number ?? "null"}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold">Email Addresses</h3>
                  {selectedPatient.email_addresses?.length > 0 ? (
                    selectedPatient.email_addresses.map((email, index) => (
                      <div key={index} className="mb-2">
                        <p><strong>Type:</strong> {email.type ?? "null"}</p>
                        <p><strong>Address:</strong> {email.address ?? "null"}</p>
                      </div>
                    ))
                  ) : (
                    <p>No email addresses available.</p>
                  )}
                  <p><strong>Primary Email Address:</strong> {selectedPatient.primary_email_address ?? "null"}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold">Additional Data</h3>
                  {selectedPatient.additional_data ? (
                    Object.entries(selectedPatient.additional_data).map(([key, value], index) => (
                      <p key={index}><strong>{key}:</strong> {value ?? "null"}</p>
                    ))
                  ) : (
                    <p>No additional data available.</p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold">Preferred Provider</h3>
                  {selectedPatient.preferred_provider ? (
                    <>
                      <p><strong>Name:</strong> {selectedPatient.preferred_provider.name ?? "null"}</p>
                      <p><strong>Remote ID:</strong> {selectedPatient.preferred_provider.remote_id ?? "null"}</p>
                      <p><strong>Type:</strong> {selectedPatient.preferred_provider.type ?? "null"}</p>
                      <p><strong>Display Name:</strong> {selectedPatient.preferred_provider.display_name ?? "null"}</p>
                    </>
                  ) : (
                    <p>No preferred provider information available.</p>
                  )}
                  <p><strong>First Visit:</strong> {selectedPatient.first_visit ?? "null"}</p>
                  <p><strong>Guarantor:</strong> {selectedPatient.guarantor ?? "null"}</p>
                </div>
              </div>

              <h3 className="text-lg font-bold mt-4">Opt-Ins</h3>
              <p><strong>SMS:</strong> {selectedPatient.opt_ins?.sms ? "Yes" : "No"}</p>
              <p><strong>Email:</strong> {selectedPatient.opt_ins?.email ? "Yes" : "No"}</p>

              <p><strong>Create Time:</strong> {selectedPatient.create_time ?? "null"}</p>
              <p><strong>Update Time:</strong> {selectedPatient.update_time ?? "null"}</p>

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
