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

interface EmailDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string) => void
  patientInfo: PatientProfile
}

export function EmailDialog({
  isOpen,
  onClose,
  onSubmit,
  patientInfo,
}: EmailDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>()

  const onSubmitForm = handleSubmit((data) => {
    onSubmit(data.email)
    onClose()
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add Email Address</DialogTitle>
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
            <Button type='button' variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit'>Add Email</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
