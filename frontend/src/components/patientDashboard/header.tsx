'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
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
import { NotificationModal } from '@/components/notificationsModal'
import { fetchNotificationsByUser } from '@/server/notifications'
import { setNotifications } from '@/redux/slices/notificationsSlice'
import { RootState } from '@/redux/store'
import { useSession } from 'next-auth/react'

interface SiteHeaderProps {
  onLogout: () => void
}

export default function Header({ onLogout }: SiteHeaderProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const dispatch = useDispatch()
  const { data: session } = useSession()

  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications,
  )

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        if (
          session?.user?.token &&
          session?.user?.userId &&
          session?.user?.clinicId
        ) {
          const notifications = await fetchNotificationsByUser(
            session.user.clinicId,
            session.user.userId,
            session.user.token,
          )
          dispatch(setNotifications(notifications))
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error)
      }
    }

    loadNotifications()
  }, [dispatch, session])

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
            <div className='grid gap-4 py-4'>
              <Button
                variant='ghost'
                className='w-full justify-start font-sans'
              >
                <Calendar className='mr-2 h-5 w-5' />
                Calendar
              </Button>
              <Button
                variant='ghost'
                className='w-full justify-start font-sans'
                onClick={() => setIsNotificationOpen(true)}
              >
                <Bell className='mr-2 h-5 w-5' />
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
                onClick={onLogout}
              >
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <div className='ml-auto hidden items-center space-x-2 md:flex'>
          <Button
            variant='ghost'
            size='icon'
            className='text-white hover:bg-blue-500'
          >
            <Calendar className='h-5 w-5' />
            <span className='sr-only'>Calendar</span>
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='text-white hover:bg-blue-500'
            onClick={() => setIsNotificationOpen(true)}
          >
            <Bell className='h-5 w-5' />
            <span className='sr-only'>Notifications</span>
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='text-white hover:bg-blue-500'
          >
            <Settings className='h-5 w-5' />
            <span className='sr-only'>Settings</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='relative h-8 w-8 rounded-full'
              >
                <Avatar className='h-8 w-8'>
                  <AvatarImage src='/placeholder-user.jpg' alt='Dr. Smith' />
                  <AvatarFallback>DS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem className='font-sans'>Profile</DropdownMenuItem>
              <DropdownMenuItem className='font-sans'>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='font-sans' onClick={onLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
