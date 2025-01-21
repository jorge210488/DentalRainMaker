'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Video } from 'lucide-react'

export function AppointmentList() {

  const appointments = [
    {
      remote_id: 233,
      date: 'March 28, 2024',
      time: '2:30 PM',
      type: 'Virtual Consultation',
      doctor: 'Dr. Johnson',
    },
    {
      remote_id: 2,
      date: 'March 28, 2024',
      time: '2:30 PM',
      type: 'Virtual Consultation',
      doctor: 'Dr. Walker',
  
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>View and manage your appointments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {appointments.map((appointment) => (
            <div
              key={appointment.remote_id}
              className='flex items-center justify-between rounded-lg border p-4'
            >
              <div className='space-y-1'>
                <p className='font-medium'>{appointment.type}</p>
                <div className='text-muted-foreground flex items-center text-sm'>
                  <Calendar className='mr-1 h-4 w-4' />
                  {appointment.date}
                </div>
                <div className='text-muted-foreground flex items-center text-sm'>
                  <Clock className='mr-1 h-4 w-4' />
                  {appointment.time}
                </div>
              </div>
              <div className='flex items-center gap-2'>
                {appointment.type && (
                  <Button variant='outline' size='sm'>
                    <Video className='mr-2 h-4 w-4' />
                    Join Call
                  </Button>
                )}
                <Button variant='outline' size='sm'>
                  Reschedule
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
