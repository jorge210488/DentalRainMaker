'use client'

import { DashboardShell } from '@/components/AdminDashboard/dashboard-shell'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { fetchAppointments } from '@/server/appointments'
import { IAppointment } from '@/interfaces/ComponentsInterfaces/Appointment'
import { AppointmentList } from '@/components/AdminDashboard/Appointments/AppointmentsList'
import { SearchAndSort } from '@/components/AdminDashboard/Appointments/SearchAndSort'
import { AppointmentModal } from '@/components/AdminDashboard/Appointments/AppointmentModal'

export default function Home() {
  const [allAppointments, setAllAppointments] = useState<IAppointment[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<
    IAppointment[]
  >([])

  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState<string>('') // Búsqueda

  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | null>(null)

  const [refreshAppointments, setRefreshAppointments] = useState(false)

  const { data: session } = useSession()
  const appointmentsPerPage = 10 // Number of items per page

  useEffect(() => {
    const initializeAppointments = async () => {
      try {
        if (session?.user?.token && session?.user?.clinicId) {
          const response = await fetchAppointments(
            session.user.clinicId,
            session.user.token,
          )
          setAllAppointments(response)
          setFilteredAppointments(response)
        }
      } catch (error) {
        console.error('Error initializing appointments:', error)
      }
    }
    initializeAppointments()
  }, [session, refreshAppointments])

  const handleRefreshAppointments = () =>
    setRefreshAppointments((prev) => !prev)

  // Manejar el cambio en la barra de búsqueda
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  // Filtrar y ordenar citas
  useEffect(() => {
    let updatedAppointments = [...allAppointments]

    // Filtro de búsqueda
    if (searchQuery) {
      updatedAppointments = updatedAppointments.filter((appointment) =>
        appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setCurrentPage(1)
    setFilteredAppointments(updatedAppointments)
  }, [searchQuery, allAppointments])

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='mb-4 text-2xl font-bold'>Appointments List</h1>

      {/* Componente de búsqueda y ordenamiento */}
      <SearchAndSort searchQuery={searchQuery} onSearch={handleSearch} />

      <AppointmentList
        appointments={filteredAppointments}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        appointmentsPerPage={appointmentsPerPage}
        setSelectedAppointment={setSelectedAppointment}
      />


      {/* Modal for Details */}
          {selectedAppointment && (
            <AppointmentModal
              appointment={selectedAppointment}
              refreshAppointment={handleRefreshAppointments}
              closeAppointmentModal={() => setSelectedAppointment(null)}
            />
          )}


    </div>
  )
}
