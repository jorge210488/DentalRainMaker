'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Dispatch, SetStateAction, useState } from 'react'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSession } from 'next-auth/react'
import { sendSmsToServer } from '@/server/sms'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

interface SmsDialogProps {
  smsOpen: boolean
  setSmsOpen: Dispatch<SetStateAction<boolean>>
  remote_id: string
  phone_number: string
}

interface SmsFormData {
  body: string
}

export function SendSms({
  smsOpen,
  setSmsOpen,
  remote_id,
  phone_number,
}: SmsDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<SmsFormData>()

  const { data: session } = useSession()

  const clinics = useSelector((state: RootState) => state.clinics.clinics)

  const clinicName =
    clinics.find((clinic) => clinic._id === session?.user?.clinicId)
      ?.clinic_name || 'Unknown Clinic'

  const [charCount, setCharCount] = useState(0)

  const onSubmitForm: SubmitHandler<SmsFormData> = async (data) => {
    try {
      if (session?.user?.token) {
        const smsPayload = {
          remote_id,
          clinic_id: session?.user?.clinicId || '',
          clinic_name: clinicName,
          to: phone_number,
          body: data.body,
        }

        const response = await sendSmsToServer(smsPayload, session.user.token)

        console.log('SMS sent successfully:', response)

        setSmsOpen(false)
        await Swal.fire({
          title: 'Success',
          text: 'The SMS has been sent successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: true,
        })
      } else {
        console.error('Session or token is missing')

        Swal.fire({
          title: 'Error',
          text: 'Failed to send SMS. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: true,
        })
      }
    } catch (error) {
      console.error('Failed to send SMS:', error)

      Swal.fire({
        title: 'Error',
        text: 'An error occurred while sending the SMS. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  return (
    <DialogContent className='w-[90%] font-sans sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle className='font-bold'>Send SMS</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className='grid gap-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='phone'>Phone Number</Label>
            <Input
              id='phone'
              type='tel'
              value={phone_number}
              disabled
              className='cursor-not-allowed bg-gray-100'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='body'>Message</Label>
            <textarea
              id='body'
              {...register('body', {
                required: 'Message body is required',
                minLength: {
                  value: 1,
                  message: 'Message body cannot be empty',
                },
                maxLength: {
                  value: 160,
                  message: 'Message body exceeds the standard SMS length',
                },
              })}
              placeholder='Enter your message'
              rows={4}
              className='w-full resize-none rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600'
              onChange={(e) => {
                const value = e.target.value
                if (value.length > 160) {
                  e.target.value = value.substring(0, 160)
                  setCharCount(160)
                } else {
                  setCharCount(value.length)
                }
              }}
            ></textarea>
            <p
              className={`text-sm ${charCount === 160 ? 'text-red-500' : 'text-gray-500'}`}
            >
              {charCount}/160{' '}
              {charCount === 160 && ' - Character limit reached'}
            </p>
            {errors.body && (
              <p className='text-sm text-red-500'>{errors.body.message}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => {
              clearErrors()
              setSmsOpen(!smsOpen)
            }}
          >
            Cancel
          </Button>
          <Button type='submit'>Send SMS</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
