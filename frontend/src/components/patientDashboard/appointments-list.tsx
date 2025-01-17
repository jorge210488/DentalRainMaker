import { Badge } from '@/components/patientDashboard/ui/badge'
import { Clock } from 'lucide-react'

interface Appointment {
  time: string
  name: string
  type: string
  status: 'confirmed' | 'pending'
}

const appointments: Appointment[] = [
  {
    time: '09:00 AM',
    name: 'Sarah Johnson',
    type: 'Cleaning',
    status: 'confirmed',
  },
  {
    time: '10:30 AM',
    name: 'Mike Peters',
    type: 'Follow-up',
    status: 'pending',
  },
  {
    time: '02:00 PM',
    name: 'Emma Wilson',
    type: 'Consultation',
    status: 'confirmed',
  },
]

export function AppointmentsList() {
  return (
    <div className='space-y-4'>
      {appointments.map((appointment) => (
        <div
          key={`${appointment.time}-${appointment.name}`}
          className='flex items-center justify-between rounded-lg bg-gray-50 p-4'
        >
          <div className='flex items-center space-x-4'>
            <div className='rounded-full bg-white p-2'>
              <Clock className='h-4 w-4 text-blue-600' />
            </div>
            <div>
              <p className='font-medium text-black'>{appointment.time}</p>
              <p className='text-muted-foreground text-sm text-black'>
                {appointment.name}
              </p>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <span className='text-muted-foreground text-sm text-black'>
              {appointment.type}
            </span>
            <Badge>
              {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
