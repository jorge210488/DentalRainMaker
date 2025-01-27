import { Metadata } from 'next'
import { DashboardShell } from '@/components/AdminDashboard/dashboard-shell'
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
    <div>
      <div className='grid gap-6'>
        
      </div>
    </div>
      
   
  )
}
