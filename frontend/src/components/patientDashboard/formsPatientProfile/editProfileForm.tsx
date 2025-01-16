import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm, SubmitHandler } from 'react-hook-form'
import { PatientProfile } from '@/app/patientDashboard/profile/page'

export default function EditProfileForm({ onClose }: { onClose: () => void }) {
  const { register, formState, handleSubmit } = useForm<PatientProfile>()

  const onSubmit: SubmitHandler<PatientProfile> = async (data) => {
    try {
    } catch (error) {}
  }

  return (
    <form onSubmit={} className='grid gap-4 py-4'>
      <div className='grid gap-2'>
        <Label htmlFor='given_name'>Given Name</Label>
        <Input
          id='given_name'
          defaultValue=''
          {...register('given_name', {
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
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='family_name'>Family Name</Label>
        <Input
          id='family_name'
          defaultValue=''
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
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='email'>Primary Email</Label>
        <Input
          id='email'
          type='email'
          defaultValue=''
          {...register('primary_email_address', {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'An email address is expected to be input here',
            },
          })}
        />
      </div>
      <div className='flex justify-end gap-2'>
        <Button variant='outline' type='button' onClick={onClose}>
          Cancel
        </Button>
        <Button type='submit'>Save Changes</Button>
      </div>
    </form>
  )
}
