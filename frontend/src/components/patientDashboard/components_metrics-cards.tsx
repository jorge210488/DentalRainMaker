import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, Bell } from 'lucide-react'

export function MetricsCards() {
  return (
    <div className='grid gap-4 md:grid-cols-3'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Next Appointment
          </CardTitle>
          <Calendar className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>Mar 15</div>
          <p className='text-muted-foreground text-xs'>
            Regular Checkup with Dr. Smith
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Treatment Progress
          </CardTitle>
          <Clock className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>75%</div>
          <p className='text-muted-foreground text-xs'>
            Orthodontic Treatment Plan
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Reminders</CardTitle>
          <Bell className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>2</div>
          <p className='text-muted-foreground text-xs'>
            Upcoming appointments & tasks
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
