import { Metadata } from 'next'
import { DashboardHeader } from '@/components/patientDashboard/dashboard-header'
import { DashboardShell } from '@/components/AdminDashboard/dashboard-shell'

export const metadata: Metadata = {
  title: 'Dashboard | Dental Rain Maker',
  description: 'Manage your dental care and appointments',
}

export default function DashboardPage() {


  return (
    <DashboardShell>
      <div className='p-8'>
        <DashboardHeader
          heading='Welcome back, Doctor'
          text='Manage your dental care journey'
        />
        
      </div>
    </DashboardShell>
      
   
  )
}
