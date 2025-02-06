'use-client'
import React, { useState } from 'react'
import { Dialog } from '@/components/ui/dialog'
import {  Mail } from 'lucide-react'
import { IAppointment } from '@/interfaces/ComponentsInterfaces/Appointment'
import { SurveyModal } from './SurveyModal'


type AppointmentModalProps = {
  appointment: IAppointment
  refreshAppointment: () => void
  closeAppointmentModal: () => void
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  appointment,
  refreshAppointment,
  closeAppointmentModal,
}) => {

  
  const [surveyOpen, setSurveyOpen] = useState(false)
 

  return (
    <>
     
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='relative max-h-screen w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg'>
        <button
            className='absolute right-2 top-2 text-gray-500 hover:text-black'
            onClick={closeAppointmentModal}
        >
            ✕
        </button>
        <h2 className='mb-4 text-center text-2xl font-bold'>
            Appointment Options
        </h2>



        <div className='flex justify-between gap-x-4'>
          

            <button
            onClick={() => setSurveyOpen(true)}
            className='flex items-center justify-center rounded p-2 hover:bg-gray-200'
            >
            <Mail className='h-5 w-5 text-blue-500' /> Survey
            </button>

            

            <button
            className='mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
            onClick={closeAppointmentModal}
            >
            Close
            </button>
        </div>

        </div>
    </div>
      

      

      {/* Survey Modal */}
      <Dialog open={surveyOpen} onOpenChange={setSurveyOpen}>
        <SurveyModal
          surveyOpen={surveyOpen}
          setSurveyOpen={setSurveyOpen}
          remote_id={String(appointment.contact.remote_id)}
          appointment_id={appointment.remote_id}
        />
      </Dialog>


    </>
  )
}
