import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PatientProfile } from '@/app/patientDashboard/profile/page'
import { DialogHeader } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Dispatch, SetStateAction, useState } from 'react'
import { updateContact } from '@/server/contacts'
import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { updateUser } from '@/redux/slices/userSlice'
import Swal from 'sweetalert2'

interface EmailFormProps {
  isEditing: boolean
  setIsEditing: Dispatch<SetStateAction<boolean>>
  patientInfo: PatientProfile
}

export default function EditProfileForm({
  isEditing,
  setIsEditing,
  patientInfo,
}: EmailFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm<Partial<PatientProfile>>() // Allow partial form inputs

  const [selectedDate, setSelectedDate] = useState<string>(
    patientInfo.birth_date || '',
  )
  const { data: session } = useSession()
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<Partial<PatientProfile>> = async (data) => {
    try {
      if (
        session?.user?.token &&
        session?.user?.userId &&
        session?.user?.clinicId
      ) {
        const updateContactDto = {
          ...data,
          ...(selectedDate && { birth_date: selectedDate }),
        }

        const filteredDto = Object.fromEntries(
          Object.entries(updateContactDto).filter(([_, value]) => value !== ''),
        )

        if (Object.keys(filteredDto).length === 0) {
          console.warn('No fields to update')
          return
        }

        const updatedContact = await updateContact(
          session.user.clinicId,
          session.user.userId,
          session.user.token,
          filteredDto,
        )

        dispatch(updateUser(updatedContact))

        console.log('Contact updated successfully:', updatedContact)

        setIsEditing(false)
        await Swal.fire({
          title: 'Success',
          text: 'The patient information has been updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        })
      } else {
        console.error('Session or required user data is missing')

        Swal.fire({
          title: 'Error',
          text: 'Failed to update patient information. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    } catch (error) {
      console.error('Failed to update contact:', error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid gap-4 py-4 font-sans'
    >
      <DialogHeader className='text-center text-[150%] font-bold'>
        <DialogTitle>Edit Patient Information</DialogTitle>
      </DialogHeader>
      <div className='grid gap-2'>
        <Label htmlFor='given_name'>Given Name</Label>
        <Input
          id='given_name'
          defaultValue={patientInfo.given_name}
          {...register('given_name', {
            minLength: {
              value: 3,
              message: 'Given name should be at least 3 characters long',
            },
            maxLength: {
              value: 50,
              message: "Given name can't be longer than 50 characters",
            },
          })}
        />
        {errors.given_name && (
          <span className='text-sm text-red-500'>
            {errors.given_name.message}
          </span>
        )}
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='family_name'>Family Name</Label>
        <Input
          id='family_name'
          defaultValue={patientInfo.family_name}
          {...register('family_name', {
            minLength: {
              value: 3,
              message: 'Family name should be at least 3 characters long',
            },
            maxLength: {
              value: 50,
              message: "Family name can't be longer than 50 characters",
            },
          })}
        />
        {errors.family_name && (
          <span className='text-sm text-red-500'>
            {errors.family_name.message}
          </span>
        )}
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='birth_date'>Birthday</Label>
        <Input
          id='birth_date'
          type='date'
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className='cursor-pointer'
        />
      </div>
      <div className='flex justify-end gap-2'>
        <Button
          variant='outline'
          type='button'
          onClick={() => {
            clearErrors()
            setIsEditing(!isEditing)
          }}
        >
          Cancel
        </Button>
        <Button type='submit'>Save Changes</Button>
      </div>
    </form>
  )
}
