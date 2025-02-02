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
import { PatientProfile } from '@/app/pages/profile/page'
import { useSession } from 'next-auth/react'
import { updateContact } from '@/server/contacts'
import Swal from 'sweetalert2'

interface PhoneDialogProps {
  phoneOpen: boolean
  setPhoneOpen: Dispatch<SetStateAction<boolean>>
  patientInfo: PatientProfile
}

interface PhoneFormData {
  phone?: string
  type?: 'HOME' | 'MOBILE' | 'WORK' | 'FAX' | 'OTHER'
}

export function AddPhone({
  phoneOpen,
  setPhoneOpen,
  patientInfo,
}: PhoneDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<PhoneFormData>()

  const { data: session } = useSession()

  const onSubmitForm: SubmitHandler<PhoneFormData> = async (data) => {
    try {
      if (
        session?.user?.token &&
        session?.user?.userId &&
        session?.user?.clinicId
      ) {
        // Formatear el body como se requiere
        const phonePayload = {
          phone_numbers: [
            {
              number: data.phone || '',
              type: data.type || 'OTHER', // Predeterminado a 'OTHER' si no se selecciona
            },
          ],
        }

        if (!data.phone) {
          Swal.fire({
            title: 'Invalid Input',
            text: 'Please provide a valid phone number.',
            icon: 'warning',
            confirmButtonText: 'OK',
          })
          return
        }

        const updatedContact = await updateContact(
          session.user.clinicId,
          session.user.userId,
          session.user.token,
          phonePayload,
        )

        console.log('Contact updated successfully:', updatedContact)

        setPhoneOpen(false)
        await Swal.fire({
          title: 'Success',
          text: 'The phone number has been added successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        })
      } else {
        console.error('Session or required user data is missing')

        Swal.fire({
          title: 'Error',
          text: 'Failed to add phone number. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    } catch (error) {
      console.error('Failed to update contact:', error)

      Swal.fire({
        title: 'Error',
        text: 'An error occurred while adding the phone number. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  return (
    <DialogContent className='w-[90%] font-sans sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle className='font-bold'>Add Phone Number</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmitForm)}>
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
              placeholder='Enter a phone number'
            />
            {errors.phone && (
              <p className='text-sm text-red-500'>{errors.phone.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='type'>Phone Type</Label>
            <select
              id='type'
              className='w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600'
              {...register('type')}
            >
              <option value=''>Select Type</option>
              <option value='HOME'>HOME</option>
              <option value='MOBILE'>MOBILE</option>
              <option value='WORK'>WORK</option>
              <option value='FAX'>FAX</option>
              <option value='OTHER'>OTHER</option>
            </select>
            {errors.type && (
              <p className='text-sm text-red-500'>{errors.type.message}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => {
              clearErrors()
              setPhoneOpen(!phoneOpen)
            }}
          >
            Cancel
          </Button>
          <Button type='submit'>Add Phone</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
