'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  MessageSquare,
  Menu,
  LayoutDashboard,
  Users,
  BarChart2,
  Video,
  Bell,
  Settings,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ children, className }: DashboardShellProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: 'Dashboard',
      href: '/dashboard/patient/home',
      icon: LayoutDashboard,
      active: pathname === '/dashboard/patient/home',
    },
    {
      label: 'Patients',
      href: '/patients',
      icon: Users,
      active: pathname === '/dashboard/patients',
    },
    {
      label: 'Appointments',
      href: '/dashboard/patient/appointments',
      icon: Calendar,
      active: pathname === '/dashboard/patient/appointments',
    },
    {
      label: 'Analytics',
      href: '/analytics',
      icon: BarChart2,
      active: pathname === '/analytics',
    },
    {
      label: 'Messages',
      href: '/messages',
      icon: MessageSquare,
      active: pathname === '/messages',
    },
    {
      label: 'Telehealth',
      href: '/telehealth',
      icon: Video,
      active: pathname === '/telehealth',
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: Bell,
      active: pathname === '/notifications',
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: Settings,
      active: pathname === '/settings',
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

      {/* Movil  */}
      <Sheet>
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

      {/* Contenido principal */}
      <main className='flex-1 overflow-y-auto'>
        <div className='container mx-auto py-6'>{children}</div>
      </main>
    </div>
  )
}
