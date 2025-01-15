import { Bell, Calendar, Settings } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/patientDashboard/ui/avatar'
import { Button } from '@/components/patientDashboard/ui/button'

export default function Header() {
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
          <Avatar>
            <AvatarImage src='/placeholder-user.jpg' alt='Dr. Smith' />
            <AvatarFallback>DS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
