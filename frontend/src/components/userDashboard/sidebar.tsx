'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils/utils'
import {
  LayoutDashboard,
  Users,
  Calendar,
  BarChart2,
  MessageSquare,
  Video,
  Bell,
  Settings,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Patients', href: '/patients', icon: Users },
  { name: 'Appointments', href: '/appointments', icon: Calendar },
  { name: 'Analytics', href: '/analytics', icon: BarChart2 },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Telehealth', href: '/telehealth', icon: Video },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className='flex w-64 flex-col bg-blue-600 text-white'>
      <div className='p-4'>
        <Link href='/' className='flex items-center space-x-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-white'>
            <span className='text-xl font-bold text-blue-600'>D</span>
          </div>
          <span className='text-xl font-bold'>DentalRainMaker</span>
        </Link>
      </div>
      <nav className='flex-1 p-4'>
        <ul className='space-y-1'>
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.name}>
                <div
                  className={cn(
                    'flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors',
                    pathname === item.href
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-700/50',
                  )}
                >
                  <Icon className='h-5 w-5' />
                  <span>{item.name}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
