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
import { Address, PatientProfile } from '@/app/patientDashboard/profile/page'
import { Dispatch, SetStateAction } from 'react'
import { useSession } from 'next-auth/react'
import { updateContact } from '@/server/contacts'
import { useDispatch } from 'react-redux'
import { updateUser } from '@/redux/slices/userSlice'
import Swal from 'sweetalert2'

interface AddressDialogProps {
  addressOpen: boolean
  setAddressOpen: Dispatch<SetStateAction<boolean>>
  patientInfo: PatientProfile
}

export function AddAddress({
  addressOpen,
  setAddressOpen,
  patientInfo,
}: AddressDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<Address>()

  const { data: session } = useSession()
  const dispatch = useDispatch()

  const onSubmitForm = handleSubmit(async (data) => {
    try {
      if (
        session?.user?.token &&
        session?.user?.userId &&
        session?.user?.clinicId
      ) {
        const addressPayload = {
          addresses: [
            {
              street_address: data.street || '',
              city: data.city || '',
              state: data.state || '',
              postal_code: data.postal_code || '',
              country_code: '', // Opcional, vacío por defecto
              type: 'ADDRESS_TYPE_UNSPECIFIED', // Default
            },
          ],
        }

        const updatedContact = await updateContact(
          session.user.clinicId,
          session.user.userId,
          session.user.token,
          addressPayload,
        )

        dispatch(updateUser(updatedContact))

        setAddressOpen(false)
        await Swal.fire({
          title: 'Success',
          text: 'The address has been added successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        })
      } else {
        console.error('Session or required user data is missing')

        Swal.fire({
          title: 'Error',
          text: 'Failed to add address. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    } catch (error) {
      console.error('Failed to update contact:', error)

      Swal.fire({
        title: 'Error',
        text: 'An error occurred while adding the address. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  })

  return (
    <DialogContent className='w-[90%] max-w-[425px] font-sans sm:mx-auto sm:max-w-[95%]'>
      <DialogHeader>
        <DialogTitle className='font-bold'>Add Address</DialogTitle>
      </DialogHeader>
      <form onSubmit={onSubmitForm}>
        <div className='grid gap-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='street'>Street Address</Label>
            <Input
              id='street'
              {...register('street', {
                required: 'Street address is required',
              })}
            />
            {errors.street && (
              <p className='text-sm text-red-500'>{errors.street.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='city'>City</Label>
            <Input
              id='city'
              {...register('city', { required: 'City is required' })}
            />
            {errors.city && (
              <p className='text-sm text-red-500'>{errors.city.message}</p>
            )}
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='state'>State</Label>
              <Input
                id='state'
                {...register('state', { required: 'State is required' })}
              />
              {errors.state && (
                <p className='text-sm text-red-500'>{errors.state.message}</p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='postal_code'>Postal Code</Label>
              <Input
                id='postal_code'
                {...register('postal_code', {
                  required: 'Postal code is required',
                })}
              />
              {errors.postal_code && (
                <p className='text-sm text-red-500'>
                  {errors.postal_code.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => {
              clearErrors()
              setAddressOpen(!addressOpen)
            }}
          >
            Cancel
          </Button>
          <Button type='submit'>Add Address</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
