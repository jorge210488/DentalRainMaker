
import { IAppointment } from '@/interfaces/ComponentsInterfaces/Appointment'
import { getAppointments } from '@/server/Appointment/getAppoinments'
import { getApp } from 'firebase/app'
import React, { useState } from 'react'

type Cita = {
  id: number
  especialidad: string
  doctora: string
  paciente: string
  fecha: string
  hora: string
  ubicacion: string
  consultorio: string
  tipo: 'Presencial' | 'Virtual'
  estadoPago: 'Pendiente' | 'Pagado'
}

const citas: Cita[] = [
  {
    id: 1,
    especialidad: 'Odontología',
    doctora: 'Dra. Flora Emperatriz Zuñiga',
    paciente: 'Jose Antonio Rojas Huaman',
    fecha: 'Lunes - 13 de enero',
    hora: '15:20hs',
    ubicacion: 'Centro Clínico Chacarilla',
    consultorio: 'Consultorio 37',
    tipo: 'Presencial',
    estadoPago: 'Pendiente',
  },
  {
    id: 2,
    especialidad: 'Pediatría',
    doctora: 'Dra. Mariana Pérez',
    paciente: 'Maria Fernanda Gómez',
    fecha: 'Miércoles - 15 de enero',
    hora: '10:00hs',
    ubicacion: 'Centro Clínico San Borja',
    consultorio: 'Consultorio 12',
    tipo: 'Virtual',
    estadoPago: 'Pagado',
  },
]

const AppointmentsPage = async() => {
  
  const appointments: IAppointment[] = await getAppointments();
  console.log(appointments);


  const [filtro, setFiltro] = useState<'Todos' | 'Presencial' | 'Virtual'>(
    'Todos',
  )

  const citasFiltradas = citas.filter((cita) =>
    filtro === 'Todos' ? true : cita.tipo === filtro,
  )

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      
      {/* Main content */}
      <main className='ml-24'>
        {/* Header */}
        <header className='mb-6 flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Mis citas</h1>
          <button className='rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600'>
            + Sacar cita
          </button>
        </header>

        {/* Filtros */}
        <div className='mb-4 flex items-center gap-4'>
          <button
            onClick={() => setFiltro('Todos')}
            className={`rounded-lg px-4 py-2 ${
              filtro === 'Todos'
                ? 'bg-green-600 text-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFiltro('Presencial')}
            className={`rounded-lg px-4 py-2 ${
              filtro === 'Presencial'
                ? 'bg-green-600 text-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Presencial
          </button>
          <button
            onClick={() => setFiltro('Virtual')}
            className={`rounded-lg px-4 py-2 ${
              filtro === 'Virtual'
                ? 'bg-green-600 text-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Virtual
          </button>
        </div>

        {/* Lista de citas */}
        <div className='space-y-4'>
          {citasFiltradas.map((cita) => (
            <div
              key={cita.id}
              className='flex items-center justify-between rounded-lg bg-white p-4 shadow-md'
            >
              <div>
                <p
                  className={`text-sm ${
                    cita.estadoPago === 'Pendiente'
                      ? 'text-red-500'
                      : 'text-green-500'
                  }`}
                >
                  {cita.estadoPago === 'Pendiente'
                    ? 'Pago pendiente'
                    : 'Pagado'}
                </p>
                <h2 className='text-lg font-bold'>{cita.doctora}</h2>
                <p className='text-sm text-gray-600'>{cita.especialidad}</p>
                <p className='text-sm text-gray-600'>
                  Paciente: {cita.paciente}
                </p>
                <p className='text-sm text-gray-600'>
                  {cita.fecha} - {cita.hora}
                </p>
                <p className='text-sm text-gray-600'>
                  {cita.ubicacion} - {cita.consultorio}
                </p>
              </div>
              <div className='flex flex-col items-end gap-2'>
                <button className='text-green-600 hover:underline'>
                  Reprogramar
                </button>
                <button className='text-red-600 hover:underline'>Anular</button>
                {cita.estadoPago === 'Pendiente' && (
                  <button className='rounded-lg border border-green-600 px-4 py-1 text-green-600 hover:bg-green-100'>
                    Pagar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default AppointmentsPage
