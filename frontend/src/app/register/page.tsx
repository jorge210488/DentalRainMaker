'use client'

import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { images } from '../../assets/index'
import Link from 'next/link'

interface FormData {
  familyName: string
  givenName: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const pass = watch('password')

  const onSubmit = async (data: FormData) => {
    const realData = {
      ...data,
      provider: 'local',
    }
    try {
      const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(realData),
      })

      if (response.ok) {
        console.log('Formulario enviado con éxito')
      } else {
        console.error('Error al enviar el formulario')
      }
    } catch (error) {
      console.error('Error de conexión', error)
    }
  }

  return (
    <div className='flex min-h-screen w-full'>
      {/* Left side - Form */}
      <div className='flex-1 p-8 lg:p-12'>
        <div className='mx-auto max-w-md space-y-6'>
          <div className='space-y-2 text-center'>
            <h1 className='text-2xl font-bold tracking-tight'>
              Welcome to Dental Rain Maker
            </h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4 font-sans'
          >
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='familyName'>Family Name</Label>
                <Input
                  id='familyName'
                  {...register('familyName', {
                    required: 'Family name is required',
                  })}
                  placeholder='Enter your family name'
                  aria-invalid={errors.familyName ? 'true' : 'false'}
                />
                {errors.familyName && (
                  <p className='text-sm text-red-500'>
                    {errors.familyName.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='givenName'>Given Name</Label>
                <Input
                  id='givenName'
                  {...register('givenName', {
                    required: 'Given name is required',
                  })}
                  placeholder='Enter your given name'
                  aria-invalid={errors.givenName ? 'true' : 'false'}
                />
                {errors.givenName && (
                  <p className='text-sm text-red-500'>
                    {errors.givenName.message}
                  </p>
                )}
              </div>
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                {...register("dateOfBirth", { required: "Date of birth is required" })}
                aria-invalid={errors.dateOfBirth ? "true" : "false"}
              />
              {errors.dateOfBirth && (
                <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>
              )}
            </div> */}

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

            <Button variant='outline' type='button' className='w-full'>
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
              Sign up with Google
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
