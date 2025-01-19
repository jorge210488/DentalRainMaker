'use client'

import { useForm } from 'react-hook-form'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PatientProfile } from '@/app/patientDashboard/profile/page'

interface PhoneDialogProps {
  isOpen: boolean
  setPhoneOpen: boolean
  patientInfo: PatientProfile
}

export function AddPhone({
  isOpen,
  setPhoneOpen,
  patientInfo,
}: PhoneDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ phone: string }>()

  const onSubmitForm = handleSubmit((data) => {
    return
  })

  return (
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle>Add Phone Number</DialogTitle>
      </DialogHeader>
      <form onSubmit={onSubmitForm}>
        <div className='grid gap-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='phone'>Phone Number</Label>
            <Input
              id='phone'
              type='tel'
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^\+?[\d\s-()]+$/,
                  message: 'Invalid phone number',
                },
              })}
            />
            {errors.phone && (
              <p className='text-sm text-red-500'>{errors.phone.message}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type='button' variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button type='submit'>Add Phone</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
