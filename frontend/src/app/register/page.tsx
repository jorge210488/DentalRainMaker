'use client'

import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { images } from '../../assets/index'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormData } from '../types/auth'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setSelectedClinic } from '@/redux/slices/clinicsSlice'
import Swal from 'sweetalert2'

export default function RegisterForm() {
  const router = useRouter()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const pass = watch('password')

  // Obtener las clínicas desde el slice
  const clinics = useSelector((state: RootState) => state.clinics.clinics)
  const selectedClinicId = useSelector(
    (state: RootState) => state.clinics.selectedClinicId,
  )

  const handleClinicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedClinic(event.target.value))
  }

  const onSubmit = async (data: FormData) => {
    const realData = {
      ...data,
      provider: 'local',
      clinic_id: selectedClinicId,
    }
    try {
      console.log('Enviando datos:', realData)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(realData),
        },
      )

      console.log('Status:', response.status)

      const result = await response.json()
      console.log('Response JSON:', result)

      if (response.status === 201) {
        const { message } = result
        console.log('Registro exitoso:', message)
        router.push('/login')
        setTimeout(() => {
          Swal.fire({
            title: 'Success',
            text: 'Your account has been created successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          })
        }, 500)
      } else {
        console.error('Error al enviar el formulario:', result)
        Swal.fire({
          title: 'Error',
          text:
            result.message || 'An error occurred while creating the account.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        })
      }
    } catch (error) {
      console.error('Error de conexión:', error)
      Swal.fire({
        title: 'Connection Error',
        text: 'Failed to connect to the server. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  return (
    <div className='flex min-h-screen w-full font-sans'>
      {/* Left side - Form */}
      <div className='flex-1 p-8 lg:p-12'>
        <div className='mx-auto max-w-md space-y-6'>
          <div className='space-y-2 text-center'>
            <h1 className='text-2xl font-bold tracking-tight'>
              Welcome to{' '}
              <div className='flex flex-row items-center justify-center space-x-2 pt-2'>
                <div className='h-8 w-9 items-center justify-center space-x-2 rounded-lg bg-blue-600'>
                  <span className='p-4 text-xl font-bold text-white'>D</span>
                </div>
                <span className='text-xl font-bold'>DentalRainMaker</span>
              </div>
            </h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4 font-sans'
          >
            <div className='space-y-2'>
              <Label htmlFor='clinic_id'>Select Clinic</Label>
              <select
                id='clinic_id'
                className={`w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.clinic_id ? 'border-red-500' : ''
                }`}
                value={selectedClinicId || ''}
                {...register('clinic_id', {
                  required: 'Selecting a clinic is required',
                  onChange: (event) => handleClinicChange(event),
                })}
              >
                <option value='' disabled>
                  Select Clinic
                </option>
                {clinics.map((clinic) => (
                  <option key={clinic._id} value={clinic._id}>
                    {clinic.clinic_name}
                  </option>
                ))}
              </select>
              {errors.clinic_id && (
                <p className='text-sm text-red-500'>
                  {errors.clinic_id.message}
                </p>
              )}
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='familyName'>Family Name</Label>
                <Input
                  id='familyName'
                  {...register('family_name', {
                    required: 'Family name is required',
                  })}
                  placeholder='Enter your family name'
                  aria-invalid={errors.family_name ? 'true' : 'false'}
                />
                {errors.family_name && (
                  <p className='text-sm text-red-500'>
                    {errors.family_name.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='givenName'>Given Name</Label>
                <Input
                  id='givenName'
                  {...register('given_name', {
                    required: 'Given name is required',
                  })}
                  placeholder='Enter your given name'
                  aria-invalid={errors.given_name ? 'true' : 'false'}
                />
                {errors.given_name && (
                  <p className='text-sm text-red-500'>
                    {errors.given_name.message}
                  </p>
                )}
              </div>
            </div>

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
                placeholder='you@example.com'
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <p className='text-sm text-red-500'>{errors.email.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{1,}$/,
                    message:
                      'Password must include uppercase, lowercase, number, and special character',
                  },
                })}
                placeholder='Enter your password'
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              {errors.password && (
                <p className='text-sm text-red-500'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='confirmPassword'>Confirm Password</Label>
              <Input
                id='confirmPassword'
                type='password'
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === pass || 'Passwords do not match',
                })}
                placeholder='Confirm your password'
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              />
              {errors.confirmPassword && (
                <p className='text-sm text-red-500'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button type='submit' className='w-full'>
              Register
            </Button>

            <div className='text-center text-sm'>
              Already have an account?{' '}
              <Link
                href='/login'
                className='text-primary font-medium hover:underline'
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className='bg-muted relative hidden flex-1 lg:flex'>
        <Image
          src={images.image2}
          alt='Modern dental clinic with advanced equipment'
          width={1920}
          height={1080}
          className='object-cover'
          priority
        />
        <div className='from-background/80 to-background/20 absolute inset-0 bg-gradient-to-t' />
        <div className='absolute bottom-0 left-0 right-0 p-8 text-white'>
          <h2 className='text-2xl font-bold'>Transform Your Dental Practice</h2>
          <p className='text-muted-foreground mt-2'>
            Streamline your dental practice management with our comprehensive
            SaaS solution
          </p>
        </div>
      </div>
    </div>
  )
}
