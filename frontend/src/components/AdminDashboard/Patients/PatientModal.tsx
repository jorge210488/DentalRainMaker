'use-client'
import React, { useState } from 'react'
import { Patient } from '@/interfaces/ComponentsInterfaces/Patient'
import { PatientEditModal } from './PatientEditModal'
import { PatientDetails } from './PatientDetails'
import { EmailModal } from '@/components/emailModal'
import { SendSms } from '@/components/smsModal'
import { FormNotificationModal } from '@/components/formNotificationModal'
import { MessageCircle, Mail, Bell } from 'lucide-react'
import { Dialog } from '@/components/ui/dialog'

type PatientModalProps = {
  patient: Patient
  refreshPatient: () => void
  closePatientModal: () => void
}

export const PatientModal: React.FC<PatientModalProps> = ({
  patient,
  refreshPatient,
  closePatientModal,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleOpenEditModal = () => setIsEditModalOpen(true)
  const handleCloseEditModal = () => setIsEditModalOpen(false)

  const [smsOpen, setSmsOpen] = useState(false)
  const [emailOpen, setEmailOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  

  const handleUpdatePatient = (updatedPatient: Patient) => {
    console.log('Updated Patient:', updatedPatient)
    refreshPatient()
  }

  return (
    <>
      {!isEditModalOpen  && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='relative max-h-screen w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg'>
            <button
              className='absolute right-2 top-2 text-gray-500 hover:text-black'
              onClick={closePatientModal}
            >
              ✕
            </button>
            <h2 className='mb-4 text-center text-2xl font-bold'>
              Patient Details
            </h2>

            <PatientDetails patient={patient}/>


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
                onClick={closePatientModal}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {isEditModalOpen && (
        <PatientEditModal
          patient={patient}
          closeEditModal={handleCloseEditModal}
          onUpdatePatient={handleUpdatePatient}
        />
      )}

      {/* SMS Modal */}
      <Dialog open={smsOpen} onOpenChange={setSmsOpen}>
        <SendSms
          smsOpen={smsOpen}
          setSmsOpen={setSmsOpen}
          remote_id={String(patient.remote_id)}
          phone_number={patient.primary_phone_number}
        />
      </Dialog>

      {/* Email Modal */}
      <Dialog open={emailOpen} onOpenChange={setEmailOpen}>
        <EmailModal
          emailOpen={emailOpen}
          setEmailOpen={setEmailOpen}
          remote_id={String(patient.remote_id)}
          email={patient.primary_email_address}
          given_name={patient.given_name}
        />
      </Dialog>

      {/* Notification Modal */}
      <Dialog open={notificationOpen} onOpenChange={setNotificationOpen}>
        <FormNotificationModal
          notificationOpen={notificationOpen}
          setNotificationOpen={setNotificationOpen}
          remote_id={String(patient.remote_id)}
          given_name={patient.given_name}
          family_name={patient.family_name}
        />
      </Dialog>

    </>
  )
}
