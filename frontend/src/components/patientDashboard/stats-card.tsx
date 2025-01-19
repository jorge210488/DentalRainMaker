import { Card, CardContent } from '@/components/patientDashboard/ui/card'
import { type LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
}: StatsCardProps) {
  const isPositive = change.startsWith('+')

  return (
    <Card>
      <CardContent className='p-6'>
        <div className='flex items-center justify-between space-x-4'>
          <div className='flex items-center space-x-4'>
            <div className='rounded-full bg-blue-100 p-2'>
              <Icon className='h-6 w-6 text-blue-600' />
            </div>
            <div>
              <p className='text-muted-foreground text-sm font-medium text-black'>
                {title}
              </p>
              <h3 className='text-2xl font-bold text-black'>{value}</h3>
            </div>
          </div>
          <span
            className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}
          >
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
