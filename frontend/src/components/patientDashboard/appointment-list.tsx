import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Video } from 'lucide-react'
import { useEffect, useState } from 'react';
import { IAppointment } from '@/interfaces/ComponentsInterfaces/Appointment';
import { getUserAppointments } from '@/server/User/getUserAppointments';

export function AppointmentList() {

  const [userAppointments, setUserAppointments] = useState<IAppointment[]>([]);

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const response = await getUserAppointments(session.user.userId, session.user.token);
        setUserAppointments(response);
      } catch (error) {
        console.error("Error fetching user appointments:", error);
      }
    };
    fetchUserAppointments();
  }, [session, status]);
  // const appointments = [
  //   {
  //     id: 1,
  //     date: 'March 15, 2024',
  //     time: '10:00 AM',
  //     type: 'Regular Checkup',
  //     doctor: 'Dr. Smith',
  //     isVirtual: false,
  //   },
  //   {
  //     id: 2,
  //     date: 'March 28, 2024',
  //     time: '2:30 PM',
  //     type: 'Virtual Consultation',
  //     doctor: 'Dr. Johnson',
  //     isVirtual: true,
  //   },
  // ]

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
              key={appointment.id}
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
                {appointment.isVirtual && (
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
