import { Card } from '@/components/patientDashboard/ui/card'
import { Progress } from '@/components/patientDashboard/ui/progress'

export function PredictiveAnalytics() {
  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-3 gap-4'>
        <Card className='p-4'>
          <p className='text-muted-foreground text-sm font-medium text-black'>
            No-Shows
          </p>
          <p className='text-2xl font-bold text-blue-600'>4.2%</p>
        </Card>
        <Card className='p-4'>
          <p className='text-muted-foreground text-sm font-medium text-black'>
            Treatment
          </p>
          <p className='text-2xl font-bold text-green-600'>78%</p>
        </Card>
        <Card className='p-4'>
          <p className='text-muted-foreground text-sm font-medium text-black'>
            Retention
          </p>
          <p className='text-2xl font-bold text-purple-600'>92%</p>
        </Card>
      </div>
      <div className='space-y-2'>
        <div className='flex justify-between text-sm text-black'>
          <span>Perfect Attendance</span>
          <span>500 pts</span>
        </div>
        <Progress value={100} className='h-2' />
        <div className='flex justify-between text-sm text-black'>
          <span>Early Bird</span>
          <span>300 pts</span>
        </div>
        <Progress value={75} className='h-2' />
        <div className='flex justify-between text-sm text-black'>
          <span>Referral Champion</span>
          <span>1000 pts</span>
        </div>
        <Progress value={50} className='h-2' />
      </div>
    </div>
  )
}
