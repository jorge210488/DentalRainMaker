'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  MessageSquare,
  User,
  FileText,
  Home,
  Menu,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      href: '/patientDashboard',
      label: 'Dashboard',
      icon: Home,
      active: pathname === '/dashboard',
    },
    {
      href: '/patientDashboard/appointments',
      label: 'Appointments',
      icon: Calendar,
      active: pathname === '/patientDashboard/appointments',
    },
    {
      href: '/patientDashboard/messages',
      label: 'Messages',
      icon: MessageSquare,
      active: pathname === '/patientDashboard/messages',
    },
    {
      href: '/patientDashboard/records',
      label: 'Records',
      icon: FileText,
      active: pathname === '/patientDashboard/records',
    },
    {
      href: '/patientDashboard/profile',
      label: 'Profile',
      icon: User,
      active: pathname === '/patientDashboard/profile',
    },
  ]

  return (
    <div className='flex min-h-screen font-sans'>
      {/* Sidebar para desktop */}
      <aside className='hidden w-64 border-r bg-blue-600 text-white lg:block'>
        <div className='flex h-full flex-col'>
          <nav className='flex-1 space-y-1 px-3 py-4'>
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'flex items-center rounded-lg px-3 py-2 text-sm font-medium',
                  route.active
                    ? 'bg-white/10 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white',
                )}
              >
                <route.icon className='mr-3 h-5 w-5' />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant='ghost' className='lg:hidden'>
            <Menu className='h-6 w-6' />
          </Button>
        </SheetTrigger>
        <SheetContent
          side='left'
          className='w-64 bg-blue-600 p-0 font-sans text-white'
        >
          <div className='flex h-full flex-col'>
            <nav className='flex-1 space-y-1 px-3 py-4'>
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setIsOpen(false)} // Close sheet when a link is clicked
                  className={cn(
                    'flex items-center rounded-lg px-3 py-2 text-sm font-medium',
                    route.active
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white',
                  )}
                >
                  <route.icon className='mr-3 h-5 w-5' />
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className='flex-1 overflow-y-auto'>
        <div className='container mx-auto py-6'>{children}</div>
      </main>
    </div>
  )
}
