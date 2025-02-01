'use-client'
import React, { useState } from 'react'

import { EmailModal } from '@/components/emailModal'
import { SendSms } from '@/components/smsModal'
import { FormNotificationModal } from '@/components/formNotificationModal'
import { MessageCircle, Mail, Bell } from 'lucide-react'
import { Dialog } from '@/components/ui/dialog'
import { Employee } from '@/interfaces/ComponentsInterfaces/Employee'
import { EmployeeDetails } from './EmployeeDetails'
import { EmployeeEditModal } from './EmployeeEditModal'

type EmployeeModalProps = {
  employee: Employee
  refreshEmployee: () => void
  closeEmployeeModal: () => void
}

export const EmployeeModal: React.FC<EmployeeModalProps> = ({
  employee,
  refreshEmployee,
  closeEmployeeModal,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleOpenEditModal = () => setIsEditModalOpen(true)
  const handleCloseEditModal = () => setIsEditModalOpen(false)

  const [smsOpen, setSmsOpen] = useState(false)
  const [emailOpen, setEmailOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    console.log('Updated Employee:', updatedEmployee)
    refreshEmployee()
  }

  return (
    <>
      {!isEditModalOpen  && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='relative max-h-screen w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg'>
            <button
              className='absolute right-2 top-2 text-gray-500 hover:text-black'
              onClick={closeEmployeeModal}
            >
              ✕
            </button>
            <h2 className='mb-4 text-center text-2xl font-bold'>
              Employee Details
            </h2>

            <EmployeeDetails employee={employee}/>


            <div className='flex justify-between gap-x-4'>
              <button
                className='mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600'
                onClick={handleOpenEditModal}
              >
                Edit
              </button>
              <button
                onClick={() => setSmsOpen(true)}
                className='flex items-center justify-center rounded p-2 hover:bg-gray-200'
              >
                <MessageCircle className='h-5 w-5 text-blue-500' />
              </button>
              <button
                onClick={() => setEmailOpen(true)}
                className='flex items-center justify-center rounded p-2 hover:bg-gray-200'
              >
                <Mail className='h-5 w-5 text-blue-500' />
              </button>
              <button
                onClick={() => setNotificationOpen(true)}
                className='flex items-center justify-center rounded p-2 hover:bg-gray-200'
              >
                <Bell className='h-5 w-5 text-blue-500' />
              </button>
              <button
                className='mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
                onClick={closeEmployeeModal}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {isEditModalOpen && (
        <EmployeeEditModal
          employee={employee}
          closeEditModal={handleCloseEditModal}
          onUpdateEmployee={handleUpdateEmployee}
        />
      )}

      {/* SMS Modal */}
      {/* <Dialog open={smsOpen} onOpenChange={setSmsOpen}>
        <SendSms
          smsOpen={smsOpen}
          setSmsOpen={setSmsOpen}
          remote_id={String(employee.remote_id)}
          phone_number={employee.primary_phone_number}
        />
      </Dialog> */}

      {/* Email Modal */}
      <Dialog open={emailOpen} onOpenChange={setEmailOpen}>
        <EmailModal
          emailOpen={emailOpen}
          setEmailOpen={setEmailOpen}
          remote_id={String(employee.remote_id)}
          email={employee.email}
          given_name={employee.given_name}
        />
      </Dialog>

      {/* Notification Modal */}
      <Dialog open={notificationOpen} onOpenChange={setNotificationOpen}>
        <FormNotificationModal
          notificationOpen={notificationOpen}
          setNotificationOpen={setNotificationOpen}
          remote_id={String(employee.remote_id)}
          given_name={employee.given_name}
          family_name={employee.family_name}
        />
      </Dialog>

    </>
  )
}
