'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { sendEmailToServer } from '@/server/email'
import Swal from 'sweetalert2'
import { useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

interface EmailDialogProps {
  emailOpen: boolean
  setEmailOpen: Dispatch<SetStateAction<boolean>>
  given_name: string
  email: string
  remote_id: string
}

interface EmailFormData {
  subject: string
  greetings?: string
  body: string
  closing?: string
  signature?: string
  url?: string
}

export function EmailModal({
  emailOpen,
  setEmailOpen,
  given_name,
  email,
  remote_id,
}: EmailDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<EmailFormData>()

  const { data: session } = useSession()

  const clinics = useSelector((state: RootState) => state.clinics.clinics)

  const clinicName =
    clinics.find((clinic) => clinic._id === session?.user?.clinicId)
      ?.clinic_name || 'Unknown Clinic'

  const onSubmitForm: SubmitHandler<EmailFormData> = async (data) => {
    try {
      if (session?.user?.token) {
        const emailDto = {
          remote_id,
          clinic_id: session?.user?.clinicId || '',
          to: email,
          subject: data.subject,
          greetings: data.greetings,
          given_name,
          clinic_name: clinicName,
          body: data.body,
          link: data.url,
          closing: data.closing,
          signature: data.signature,
        }

        const response = await sendEmailToServer(emailDto, session.user.token)

        if (response.status === 'Your email was sent successfully.') {
          console.log('Email sent successfully:', response)

          // Close the modal before showing Swal
          setEmailOpen(false)

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
      setEmailOpen(false)

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
        <DialogTitle className='font-bold'>Send Email</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className='grid gap-1 py-2 sm:gap-2'>
          <div className='space-y-1'>
            <Label htmlFor='to'>To</Label>
            <Input
              id='to'
              type='email'
              value={email}
              disabled
              className='cursor-not-allowed bg-gray-100'
            />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='subject'>Subject</Label>
            <Input
              id='subject'
              type='text'
              {...register('subject', {
                required: 'Subject is required',
              })}
              placeholder='Enter the email subject'
            />
            {errors.subject && (
              <p className='text-sm text-red-500'>{errors.subject.message}</p>
            )}
          </div>
          <div className='space-y-1'>
            <Label htmlFor='greetings'>Greetings</Label>
            <Input
              id='greetings'
              type='text'
              {...register('greetings')}
              placeholder='Enter a greeting (Default is Hello)'
            />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='body'>Body</Label>
            <textarea
              id='body'
              {...register('body', {
                required: 'Body is required',
              })}
              placeholder='Enter the email body'
              rows={4}
              className='w-full resize-none rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600'
            ></textarea>
            {errors.body && (
              <p className='text-sm text-red-500'>{errors.body.message}</p>
            )}
          </div>
          <div className='space-y-1'>
            <Label htmlFor='closing'>Closing</Label>
            <Input
              id='closing'
              type='text'
              {...register('closing')}
              placeholder='Enter a closing (Default is Best regards)'
            />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='closing'>Signature</Label>
            <Input
              id='signature'
              type='text'
              {...register('signature')}
              placeholder='Enter a signature (Default is The clinic name team)'
            />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='url'>URL</Label>
            <Input
              id='url'
              type='url'
              {...register('url')}
              placeholder='Enter a URL (Default is Dental Rain Maker page)'
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => {
              clearErrors()
              setEmailOpen(!emailOpen)
            }}
          >
            Cancel
          </Button>
          <Button type='submit'>Send Email</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
