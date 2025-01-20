import { Metadata } from 'next'
import { DashboardShell } from '@/components/patientDashboard/dashboard-shell'
import { DashboardHeader } from '@/components/patientDashboard/dashboard-header'
import { AppointmentList } from '@/components/patientDashboard/appointment-list'
import { TreatmentProgress } from '@/components/patientDashboard/components_treatment-progress'
import { MessagingWidget } from '@/components/patientDashboard/components_messaging-widget'
import { MetricsCards } from '@/components/patientDashboard/components_metrics-cards'

export const metadata: Metadata = {
  title: 'Dashboard | Dental Rain Maker',
  description: 'Manage your dental care and appointments',
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className='p-8'>
        <DashboardHeader
          heading='Welcome back, Sarah'
          text='Manage your dental care journey'
        />
        <div className='grid gap-6'>
          <MetricsCards />
          <div className='grid gap-6 md:grid-cols-2'>
            <AppointmentList />
            <TreatmentProgress />
          </div>
          <MessagingWidget />
        </div>
      </div>
    </DashboardShell>
  )
}
