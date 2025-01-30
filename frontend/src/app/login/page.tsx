'use client'

import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { images } from '../../assets/index'
import { useRouter } from 'next/navigation'
import { LoginFormData } from '../types/auth'
import { signIn } from 'next-auth/react'
import Swal from 'sweetalert2'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setSelectedClinic } from '@/redux/slices/clinicsSlice'
import { Clinic } from '@/redux/types/clinic.interface'

export default function LoginForm() {
  const router = useRouter()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  // Obtener las clínicas desde el store de Redux
  const clinics = useSelector((state: RootState) => state.clinics.clinics)
  const selectedClinicId = useSelector(
    (state: RootState) => state.clinics.selectedClinicId,
  )

  const onSubmit = async (data: LoginFormData) => {
    const { email, password } = data

    try {
      const result = await signIn('credentials', {
        email,
        password,
        provider: 'local',
        callbackUrl: '/', // 🔹 Forzar actualización de sesión después del login
      })

      if (!result?.error) {
        Swal.fire({
          title: 'Login Successful',
          text: 'Welcome back!',
          icon: 'success',

          confirmButtonText: 'Ok',
        })
      }
    } catch (error) {
      console.error('Error during login:', error)
      Swal.fire({
        title: 'Login Failed',
        text: 'Invalid email or password.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      })
    }
  }

  const handleGoogleSignIn = async () => {
    if (!selectedClinicId) {
      Swal.fire({
        title: 'Missing Information',
        text: 'Please select a clinic.',
        icon: 'warning',
        confirmButtonText: 'Ok',
      })
      return
    }

    await signIn('google', {
      callbackUrl: '/api/auth/callback/google',
      // state: JSON.stringify({ clinicId: selectedClinicId }),
    })
  }

  const handleClinicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedClinic(event.target.value))
  }

  return (
    <div className='flex min-h-screen w-full font-sans'>
      {/* Left side - Form */}
      <div className='flex-1 p-8 lg:p-12'>
        <div className='mx-auto max-w-sm space-y-6'>
          <div className='flex flex-row items-center justify-center space-x-2 pt-2'>
            <div className='h-8 w-9 items-center justify-center space-x-2 rounded-lg bg-blue-600'>
              <span className='p-4 text-xl font-bold text-white'>D</span>
            </div>
            <span className='text-xl font-bold'>DentalRainMaker</span>
          </div>

          <div className='space-y-2 text-center'>
            <h1 className='text-2xl font-bold tracking-tight'>Welcome!</h1>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='clinic_id'>Select Clinic</Label>
            <select
              id='clinic_id'
              className='w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600'
              value={selectedClinicId || ''}
              onChange={handleClinicChange}
            >
              <option value='' disabled>
                Select Clinic
              </option>
              {clinics.map((clinic: Clinic) => (
                <option key={clinic._id} value={clinic._id}>
                  {clinic.clinic_name}
                </option>
              ))}
            </select>
            {errors.clinic_id && (
              <p className='text-sm text-red-500'>{errors.clinic_id.message}</p>
            )}
          </div>

          <Button
            variant='outline'
            type='button'
            className='w-full'
            onClick={handleGoogleSignIn}
          >
            <svg className='mr-2 h-4 w-4' viewBox='0 0 24 24'>
              <path
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                fill='#4285F4'
              />
              <path
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                fill='#34A853'
              />
              <path
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                fill='#FBBC05'
              />
              <path
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                fill='#EA4335'
              />
            </svg>
            Sign in with Google
          </Button>

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background text-muted-foreground px-2'>
                or
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                {...register('email', { required: 'Email is required' })}
                placeholder='Enter your email'
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
                {...register('password', { required: 'Password is required' })}
                placeholder='Enter your password'
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              {errors.password && (
                <p className='text-sm text-red-500'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type='submit' className='w-full'>
              Login
            </Button>
          </form>

          <div className='space-y-2 text-center text-sm'>
            <Link
              href='/forgot-password'
              className='text-blue-600 hover:underline'
            >
              Forgot your password?
            </Link>
            <div className='text-muted-foreground'>
              Don&apos;t have an account?{' '}
              <Link href='/register' className='text-blue-600 hover:underline'>
                Join now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className='relative hidden flex-1 lg:flex'>
        <Image
          src={images.image1}
          alt='Modern dental clinic with advanced equipment'
          width={1920}
          height={1080}
          className='object-cover'
          priority
        />
        <div className='from-background/80 to-background/20 absolute inset-0 bg-gradient-to-t' />
        <div className='absolute bottom-0 left-0 right-0 p-8 text-white'>
          <h2 className='text-2xl font-bold'>Welcome Back</h2>
          <p className='text-muted-foreground mt-2'>
            Continue managing your dental practice with our comprehensive
            solution
          </p>
        </div>
      </div>
    </div>
  )
}
