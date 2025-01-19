'use client'

import { useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Bell, Calendar, Settings } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/patientDashboard/ui/avatar'
import { Button } from '@/components/patientDashboard/ui/button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  useEffect(() => {
    if (status === 'authenticated') {
      console.log('Session is authenticated')
      console.log('Token:', session?.user?.token)
      console.log('User ID:', session?.user?.userId)
      console.log('User Type:', session?.user?.type)
      console.log('User Views:', session?.user?.views)
      console.log('Clinic ID:', session?.user?.clinicId)
    } else if (status === 'unauthenticated') {
      console.log('No session available')
    } else if (status === 'loading') {
      console.log('Session is loading')
    }
  }, [status, session])

  return (
    <header className='border-b bg-white'>
      <div className='flex h-16 items-center gap-4 px-4'>
        <h1 className='text-2xl font-semibold text-blue-600'>
          DentalRainMaker
        </h1>
        <span className='rounded bg-blue-100 px-2 py-1 text-xs text-blue-600'>
          Beta
        </span>
        <div className='ml-auto flex items-center space-x-4'>
          <Button>
            <Calendar className='h-5 w-5' />
          </Button>
          <Button>
            <Bell className='h-5 w-5' />
          </Button>
          <Button>
            <Settings className='h-5 w-5' />
          </Button>
          <div className='relative'>
            <Avatar onClick={toggleMenu} className='cursor-pointer'>
              <AvatarImage src='/placeholder-user.jpg' alt='Dr. Smith' />
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
            {isMenuOpen && (
              <div className='absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg'>
                <div className='py-2'>
                  <button
                    onClick={handleLogout}
                    className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
