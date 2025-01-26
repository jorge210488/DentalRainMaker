import React from 'react'
import { Patient } from '@/interfaces/ComponentsInterfaces/Patient'

type PatientListProps = {
  patients: Patient[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  patientsPerPage: number
  setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | null>>
  setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const PatientList: React.FC<PatientListProps> = ({
  patients,
  currentPage,
  setCurrentPage,
  patientsPerPage,
  setSelectedPatient,
  setIsCreateModalOpen,
}) => {
  const totalPages = Math.ceil(patients.length / patientsPerPage)

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const paginatedPatients = patients.slice(
    (currentPage - 1) * patientsPerPage,
    currentPage * patientsPerPage,
  )

  return (
    <div>
      <div className='mb-4 flex justify-end'>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
        >
          New Patient
        </button>
      </div>

      <table className='w-full border-collapse text-left'>
        <thead>
          <tr className='border-b'>
            <th className='p-2'>Name</th>
            <th className='p-2'>Age</th>
            <th className='p-2'>Insurance</th>
            <th className='p-2'>Next Visit</th>
            <th className='p-2'>Last Visit</th>
            <th className='p-2'>Treatment Active</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPatients.map((patient) => (
            <tr key={patient.remote_id} className='hover:bg-gray-100'>
              <td className='p-2'>
                <button
                  className='text-blue-500 hover:underline'
                  onClick={() => setSelectedPatient(patient)}
                >
                  {patient.fullname}
                </button>
              </td>
              <td className='p-2'>{patient.age}</td>
              <td className='p-2'>{patient.insurance}</td>
              <td className='p-2'>{patient.nextVisit}</td>
              <td className='p-2'>{patient.lastVisit}</td>
              <td className='p-2'>{patient.activeTreatment ? 'Sí' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='mt-4 flex items-center justify-center'>
        <button
          className='mx-1 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className='mx-1 px-4 py-2'>{`Página ${currentPage} de ${totalPages}`}</span>
        <button
          className='mx-1 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}
