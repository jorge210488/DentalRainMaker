import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PatientProfile } from '@/app/patientDashboard/profile/page'
import { DialogHeader } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Dispatch, SetStateAction } from 'react'

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
  } = useForm<PatientProfile>()

  const onSubmit: SubmitHandler<PatientProfile> = (data) => {
    console.log(data)
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
          defaultValue=''
          {...register('given_name', {
            required: 'Given name is required',
            minLength: {
              value: 3,
              message: 'Given name should be at least 3 characters long',
            },
            maxLength: {
              value: 50,
              message: "Family name can't be longer than 50 characters",
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
          defaultValue=''
          {...register('family_name', {
            required: 'Family name is required',
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
        <Label htmlFor='email'>Primary Email</Label>
        <Input
          id='email'
          type='email'
          defaultValue=''
          {...register('primary_email_address', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email format',
            },
          })}
        />
        {errors.primary_email_address && (
          <span className='text-sm text-red-500'>
            {errors.primary_email_address.message}
          </span>
        )}
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
