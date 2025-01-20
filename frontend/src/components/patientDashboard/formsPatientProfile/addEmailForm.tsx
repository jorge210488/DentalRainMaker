'use client'

import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PatientProfile } from '@/app/patientDashboard/profile/page'
import { Dispatch, SetStateAction } from 'react'

interface EmailDialogProps {
  emailOpen: boolean
  setEmailOpen: Dispatch<SetStateAction<boolean>>
  patientInfo: PatientProfile
}

export function AddEmail({
  emailOpen,
  setEmailOpen,
  patientInfo,
}: EmailDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<{ email: string }>()

  const onSubmitForm = handleSubmit((data) => {
    return
  })

  return (
    <DialogContent className='font-sans sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle className='font-bold'>Add Email Address</DialogTitle>
      </DialogHeader>
      <form onSubmit={onSubmitForm}>
        <div className='grid gap-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email Address</Label>
            <Input
              id='email'
              type='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
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
          <Button type='submit'>Add Email</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
