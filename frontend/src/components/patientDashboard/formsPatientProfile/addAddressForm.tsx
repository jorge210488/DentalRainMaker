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

  const onSubmitForm = handleSubmit((data) => {
    return
  })

  return (
    <DialogContent className='font-sans sm:max-w-[425px]'>
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
