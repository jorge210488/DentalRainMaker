import React, { useState } from 'react'

import { useSession } from 'next-auth/react'
import { updateContact } from '@/server/contacts'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { Employee } from '@/interfaces/ComponentsInterfaces/Employee'
import { updateTypeEmployee } from '@/server/Employees/employees'

type EmployeeEditModalProps = {
  employee: Employee
  closeEditModal: () => void
  onUpdateEmployee: (updatedEmployee: Employee) => void
}

export const EmployeeEditModal: React.FC<EmployeeEditModalProps> = ({
  employee,
  closeEditModal,
  onUpdateEmployee,
}) => {
  const [formData, setFormData] = useState(employee)
  const { data: session } = useSession()

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }


  const handleSubmit = async () => {
    // Aquí puedes integrar la lógica para enviar los datos actualizados al backend.
    try {
      const newData: Partial<Employee> = {}

      if (formData.given_name) newData.given_name = formData.given_name
      if (formData.family_name) newData.family_name = formData.family_name

      console.log('esta es mi data para editar', newData)

      if (session?.user.clinicId && session.user.token) {
        const response = await updateContact(
          session.user.clinicId,
          employee.remote_id.toString(),
          session.user.token,
          newData,
        )

        if (response) {
          Swal.fire({
            title: 'Success',
            text: 'The employee has been updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          })
          onUpdateEmployee(formData) // Llama a la función para actualizar el paciente.
          closeEditModal() // Cierra el modal.
        } else {
          Swal.fire({
            title: 'Error',
            text: 'An error occurred while updating the employee.',
            icon: 'error',
            confirmButtonText: 'Try Again',
          })
        }
      }
    } catch (error) {
      Swal.fire({
        title: 'Connection Error',
        text: 'Failed to connect to the server. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }


  const handleSubmitRoles = async () => {
    // Aquí puedes integrar la lógica para enviar los datos actualizados al backend.
    try {
      

      if (session?.user.clinicId && session.user.token) {
        const response = await updateTypeEmployee(
          session.user.clinicId,
          session.user.token,
          employee.credential_id,
          formData.type
        )

        if (response) {
          Swal.fire({
            title: 'Success',
            text: 'The employee type has been updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          })
          onUpdateEmployee(formData) // Llama a la función para actualizar el paciente.
          closeEditModal() // Cierra el modal.
        } else {
          Swal.fire({
            title: 'Error',
            text: 'An error occurred while updating the employee tupe.',
            icon: 'error',
            confirmButtonText: 'Try Again',
          })
        }
      }
    } catch (error) {
      Swal.fire({
        title: 'Connection Error',
        text: 'Failed to connect to the server. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative max-h-screen w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg'>
        <button
          className='absolute right-2 top-2 text-gray-500 hover:text-black'
          onClick={closeEditModal}
        >
          ✕
        </button>
        <h2 className='mb-4 text-center text-2xl font-bold'>Edit Employee</h2>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
            <label>
              <strong>Given Name:</strong>
              <input
                type='text'
                name='given_name'
                value={formData.given_name || ''}
                onChange={handleInputChange}
                className='w-full rounded border p-2'
              />
            </label>
            <label>
              <strong>Family Name:</strong>
              <input
                type='text'
                name='family_name'
                value={formData.family_name || ''}
                onChange={handleInputChange}
                className='w-full rounded border p-2'
              />
            </label>


            <label>
              <strong>Type:</strong>
              <select
                name='type'
                value={formData.type || ''}
                onChange={handleInputChange}
                className='w-full rounded border p-2'
              >
                <option value='' disabled>
                  Select Type
                </option>
                <option value='ADMIN'>Admin</option>
                <option value='PATIENT'>Patient</option>
                <option value='EMPLOYEER'>Employee</option>
                <option value='VENDOR'>Vendor</option>
                <option value='OTHER'>Other</option>
              </select>
            </label>

          </div>

  

        </div>
        <button
          className='mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          onClick={handleSubmit}
        >
          Update Information
        </button>
        <button
          className='mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          onClick={handleSubmitRoles}
        >
          Update Roles
        </button>
        <button
          className='ml-2 mt-4 rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400'
          onClick={closeEditModal}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
