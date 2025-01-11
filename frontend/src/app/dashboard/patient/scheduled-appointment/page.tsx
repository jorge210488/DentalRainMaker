'use client'
import React from 'react'

const ProgramarCita = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='flex items-center gap-2 bg-white px-6 py-4 shadow'>
        <span className='text-gray-500'>🏠</span>
        <span className='text-gray-400'>/</span>
        <h2 className='text-lg font-medium text-gray-700'>Programa una cita</h2>
      </div>

      {/* Contenido principal */}
      <div className='flex flex-col items-center justify-center px-6 py-12'>
        <h1 className='text-center text-2xl font-semibold text-gray-800'>
          Programa una cita virtual o presencial en nuestra red de clínicas y
          centros clínicos.
        </h1>
        <p className='mt-4 text-center text-gray-600'>
          Selecciona el tipo de atención de tu preferencia.
        </p>

        {/* Opciones de citas */}
        <div className='mt-8 w-full max-w-md space-y-4'>
          {/* Cita Presencial */}
          <div className='flex cursor-pointer items-center justify-between rounded-lg bg-white px-6 py-4 shadow hover:bg-gray-100'>
            <div>
              <h3 className='text-lg font-medium text-gray-800'>
                Cita presencial
              </h3>
              <p className='text-sm text-gray-500'>
                Agenda una cita con un especialista
              </p>
            </div>
            <span className='text-2xl text-green-500'>→</span>
          </div>

          {/* Cita Virtual */}
          <div className='flex cursor-pointer items-center justify-between rounded-lg bg-white px-6 py-4 shadow hover:bg-gray-100'>
            <div>
              <h3 className='text-lg font-medium text-gray-800'>
                Cita virtual
              </h3>
              <p className='text-sm text-gray-500'>
                Agenda una cita con un especialista
              </p>
            </div>
            <span className='text-2xl text-green-500'>→</span>
          </div>

          {/* Chequeo Médico */}
          <div className='flex cursor-pointer items-center justify-between rounded-lg bg-white px-6 py-4 shadow hover:bg-gray-100'>
            <div>
              <h3 className='text-lg font-medium text-gray-800'>
                Chequeo médico
              </h3>
              <p className='text-sm text-gray-500'>
                Agenda una cita para tu chequeo
              </p>
            </div>
            <span className='text-2xl text-green-500'>→</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgramarCita
