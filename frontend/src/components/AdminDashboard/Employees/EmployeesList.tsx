
import { Employee } from '@/interfaces/ComponentsInterfaces/Employee'
import React from 'react'


type EmployeeListProps = {
  employees: Employee[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  employeesPerPage: number
}

export const EmployeesList: React.FC<EmployeeListProps> = ({
  employees,
  currentPage,
  setCurrentPage,
  employeesPerPage,
  
}) => {
  const totalPages = Math.ceil(employees.length / employeesPerPage)

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const paginatedEmployees = employees.slice(
    (currentPage - 1) * employeesPerPage,
    currentPage * employeesPerPage,
  )

  return (
    <div>
      

      <table className='w-full border-collapse text-left'>
        <thead>
          <tr className='border-b'>
            <th className='p-2'>Name</th>
            <th className='p-2'>Email</th>
            <th className='p-2'>Type</th>
            
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.map((employee) => (
            <tr key={employee.remote_id} className='hover:bg-gray-100'>
              <td className='p-2'>
                <button
                  className='text-blue-500 hover:underline'
                  onClick={() => {}}
                >
                  {employee.given_name+" "+employee.family_name}
                </button>
              </td>
              <td className='p-2'>{employee.email}</td>
              <td className='p-2'>{employee.type}</td>
              
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
