'use client'

import { DashboardShell } from '@/components/AdminDashboard/dashboard-shell'
import { EmployeeModal } from '@/components/AdminDashboard/Employees/EmployeeModal'
import { EmployeesList } from '@/components/AdminDashboard/Employees/EmployeesList'
import { SearchAndSort } from '@/components/AdminDashboard/Employees/SearchAndSort'
import { Employee } from '@/interfaces/ComponentsInterfaces/Employee'
import { fetchEmployees } from '@/server/Employees/employees'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'



export default function Home() {
  const [allEmployees, setAllEmployees] = useState<Employee[]>([])
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([])

  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState<string>('') // Búsqueda

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const [refreshEmployees, setRefreshEmployees] = useState(false)

  const { data: session } = useSession()
  const employeesPerPage = 10 // Number of items per page

  useEffect(() => {
    const initializeEmployees = async () => {
      try {
        if (session?.user?.token && session?.user?.clinicId) {
          const response = await fetchEmployees(
            session.user.clinicId,
            session.user.token,
          )
          setAllEmployees(response)
          setFilteredEmployees(response)
        }
      } catch (error) {
        console.error('Error initializing employees:', error)
      }
    }
    initializeEmployees()
  }, [session, refreshEmployees])

  const handleRefreshEmployees = () => setRefreshEmployees((prev) => !prev)

  // Manejar el cambio en la barra de búsqueda
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }


  // Filtrar y ordenar empleados
  useEffect(() => {
    let updatedEmployees = [...allEmployees]

    // Filtro de búsqueda
    if (searchQuery) {
      updatedEmployees = updatedEmployees.filter((employee) =>
        employee.family_name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setCurrentPage(1)
    setFilteredEmployees(updatedEmployees)
  }, [searchQuery, allEmployees])

  return (
    <DashboardShell>
      <div className='min-h-screen bg-gray-100 p-6'>
        <h1 className='mb-4 text-2xl font-bold'>Employees List</h1>

        {/* Componente de búsqueda y ordenamiento */}
        <SearchAndSort
          searchQuery={searchQuery}
          onSearch={handleSearch}
        />

        <EmployeesList
          employees={filteredEmployees}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          employeesPerPage={employeesPerPage}
          setSelectedEmployee={setSelectedEmployee}
        />

        {/* Modal for Employee Details */}
        {selectedEmployee && (
          <EmployeeModal
            employee={selectedEmployee}
            refreshEmployee={handleRefreshEmployees}
            closeEmployeeModal={() => setSelectedEmployee(null)}
          />
        )}

        
      </div>
    </DashboardShell>
  )
}