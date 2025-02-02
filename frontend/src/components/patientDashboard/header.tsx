'use client'

import * as React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Bell, Calendar, Menu, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { RootState } from '@/redux/store'
import { useSession } from 'next-auth/react'
import { clearUser } from '@/redux/slices/userSlice'
import { clearNotifications } from '@/redux/slices/notificationsSlice'
import NotificationModal from '../notificationsModal'

interface SiteHeaderProps {
  onLogout: () => void
}

export default function Header({ onLogout }: SiteHeaderProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const dispatch = useDispatch()
  const { data: session } = useSession()

  // 🔹 Obtener `unreadCount` desde Redux (manteniendo su funcionalidad)
  const unreadCount = useSelector(
    (state: RootState) => state.notifications.unreadCount,
  )

  const handleLogout = () => {
    dispatch(clearUser())
    dispatch(clearNotifications())
    onLogout()
  }

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-blue-600 font-sans sm:w-[127vw]'>
      <div className='container flex h-16 items-center px-4'>
        {/* Logo Section */}
        <div className='flex items-center gap-2'>
          <div className='flex h-8 w-9 items-center justify-center rounded-lg bg-white'>
            <span className='text-xl font-bold text-blue-600'>D</span>
          </div>
          <span className='text-xl font-bold text-white'>DentalRainMaker</span>
          <span className='ml-2 rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600'>
            Beta
          </span>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='ml-auto text-white hover:bg-blue-500 md:hidden'
            >
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className='w-full justify-start font-sans'>
                Menu
              </SheetTitle>
            </SheetHeader>
            <div className='relative grid gap-4 py-4'>
              <Button
                variant='ghost'
                className='w-full justify-start font-sans'
              >
                <Calendar className='mr-2 h-5 w-5' />
                Calendar
              </Button>
              <Button
                variant='ghost'
                className='relative w-full justify-start font-sans'
                onClick={() => setIsNotificationOpen(true)}
              >
                {/* Icono de la campanita */}
                <div className='relative'>
                  <Bell className='mr-2 h-5 w-5' />

                  {unreadCount > 0 && (
                    <div className='absolute right-[-4px] top-[-5px] flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white md:hidden'>
                      {unreadCount}
                    </div>
                  )}
                </div>
                Notifications
              </Button>

              <Button
                variant='ghost'
                className='w-full justify-start font-sans'
              >
                <Settings className='mr-2 h-5 w-5' />
                Settings
              </Button>
              <Button
                variant='ghost'
                className='w-full justify-start font-sans'
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <div className='ml-auto hidden items-center space-x-2 md:flex'>
          <div className='relative'>
            <Button
              variant='ghost'
              size='icon'
              className='text-white hover:bg-blue-500'
              onClick={() => setIsNotificationOpen(true)}
            >
              <Bell className='h-5 w-5' />
              <span className='sr-only'>Notifications</span>
            </Button>
            {unreadCount > 0 && (
              <div className='absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
                {unreadCount}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notification Modal */}
      {isNotificationOpen && (
        <NotificationModal
          isOpen={isNotificationOpen}
          setIsOpen={setIsNotificationOpen}
        />
      )}
    </header>
  )
}
