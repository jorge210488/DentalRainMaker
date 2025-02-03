'use client'

import { Metadata } from 'next'
import { useSelector } from 'react-redux'
import { DashboardHeader } from '@/components/patientDashboard/dashboard-header'
import { AppointmentList } from '@/components/patientDashboard/appointment-list'
import { TreatmentProgress } from '@/components/patientDashboard/components_treatment-progress'
import { MetricsCards } from '@/components/patientDashboard/components_metrics-cards'
import { RootState } from '@/redux/store'

const metadata: Metadata = {
  title: 'Dashboard | Dental Rain Maker',
  description: 'Manage your dental care and appointments',
}

export default function DashboardPage() {
  const { given_name } = useSelector((state: RootState) => state.user)

  return (
    <div className='absolute right-0 overflow-y-scroll lg:left-0 lg:top-[10vh] lg:max-w-[100%]'>
      <DashboardHeader
        heading={`Welcome back, ${given_name}`}
        text='Manage your dental care journey'
      />
      <div className='grid gap-6 overflow-y-scroll'>
        <MetricsCards />
        <div className='grid gap-6 md:grid-cols-2'>
          <AppointmentList />
          <TreatmentProgress />
        </div>
      </div>
    </div>
  )
}
