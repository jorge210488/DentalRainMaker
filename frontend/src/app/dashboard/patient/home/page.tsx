import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/userDashboard/ui/card'
import { Users, DollarSign, Calendar, TrendingUp } from 'lucide-react'
import { StatsCard } from '@/components/userDashboard/stats-card'
import { AppointmentsList } from '@/components/userDashboard/appointments-list'
import { RevenueChart } from '@/components/userDashboard/revenue-chart'
import { AgeDistribution } from '@/components/userDashboard/age-distribution'
import { PredictiveAnalytics } from '@/components/userDashboard/predictive-analytics'
import { MarketingMetrics } from '@/components/userDashboard/marketing-metrics'

export default function DashboardPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight text-black'>
          Practice Overview
        </h2>
        <p className='text-muted-foreground text-black'>
          Track your key performance indicators and patient insights
        </p>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatsCard
          title='Total Patients'
          value='2,847'
          change='+12.5%'
          icon={Users}
        />
        <StatsCard
          title='Monthly Revenue'
          value='$142,384'
          change='+8.2%'
          icon={DollarSign}
        />
        <StatsCard
          title='Appointments'
          value='184'
          change='+5.3%'
          icon={Calendar}
        />
        <StatsCard
          title='Patient Retention'
          value='94%'
          change='+2.1%'
          icon={TrendingUp}
        />
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>
        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <AgeDistribution />
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card className='col-span-2'>
          <CardHeader>
            <CardTitle>Today Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <AppointmentsList />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Predictive Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <PredictiveAnalytics />
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Marketing & Communication</CardTitle>
          </CardHeader>
          <CardContent>
            <MarketingMetrics />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
