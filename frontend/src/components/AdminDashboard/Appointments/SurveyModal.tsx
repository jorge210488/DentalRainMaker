'use client'

import { Dispatch, SetStateAction } from 'react'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'


import Swal from 'sweetalert2'
import { useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { sendSurveyEmail } from '@/server/Appointment/appointmentsApi'
import { DialogDescription } from '@radix-ui/react-dialog'

interface SurveyDialogProps {
  surveyOpen: boolean
  setSurveyOpen: Dispatch<SetStateAction<boolean>>
  remote_id: string
  appointment_id: string  
}


export function SurveyModal({
  surveyOpen,
  setSurveyOpen,
  remote_id,
  appointment_id,
}: SurveyDialogProps) {
  

  const { data: session } = useSession()

  const clinics = useSelector((state: RootState) => state.clinics.clinics)

  const clinicName =
    clinics.find((clinic) => clinic._id === session?.user?.clinicId)
      ?.clinic_name || 'Unknown Clinic'

  const handleSubmitSurvey = async () => {
    try {
      console.log("entre para enviar survey");
      
      if (session?.user?.token && session?.user?.clinicId) {

        const response = await sendSurveyEmail(
            remote_id,
            appointment_id,
            session.user.clinicId,
            clinicName,
            session.user.token
        )
        
        if (response.messageId) {
          console.log('Survey sent successfully:', response)

          // Close the modal before showing Swal
          setSurveyOpen(false)

          // Show success Swal
          await Swal.fire({
            title: 'Success',
            text: response.status,
            icon: 'success',
            confirmButtonText: 'OK',
            allowOutsideClick: true,
          })
        } else {
          throw new Error('Unexpected response format.')
        }
      }
    } catch (error) {
      console.error('Failed to send email:', error)

      // Close the modal before showing Swal
      setSurveyOpen(false)

      // Show error Swal
      await Swal.fire({
        title: 'Error',
        text: 'An error occurred while sending the email. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: true,
      })
    }
  }

  return (
    <DialogContent className='w-[90%] font-sans sm:max-w-[800px]'>

      <DialogHeader>
        <DialogTitle className='font-bold'>Survey</DialogTitle>
      </DialogHeader>

      <DialogDescription>
        ¿Would you like to send the survey to the patient?
      </DialogDescription>

        <Button
            type='button'
            onClick={handleSubmitSurvey}
          >
            Send Survey
        </Button>

        <DialogFooter>
            <Button
            type='button'
            variant='outline'
            onClick={() => {
                setSurveyOpen(!surveyOpen)
            }}
            >
            Cancel
            </Button>
        </DialogFooter>

    </DialogContent>
  )
}
