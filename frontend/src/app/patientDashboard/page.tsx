// 'use client'

import { Metadata } from 'next'
import { DashboardShell } from '@/components/patientDashboard/dashboard-shell'
import { DashboardHeader } from '@/components/patientDashboard/dashboard-header'
import { AppointmentList } from '@/components/patientDashboard/appointment-list'
import { TreatmentProgress } from '@/components/patientDashboard/components_treatment-progress'
import { MessagingWidget } from '@/components/patientDashboard/components_messaging-widget'
import { MetricsCards } from '@/components/patientDashboard/components_metrics-cards'
// import { useSession } from 'next-auth/react'
// import { useEffect } from 'react'

export const metadata: Metadata = {
  title: 'Dashboard | Dental Rain Maker',
  description: 'Manage your dental care and appointments',
}

export default function DashboardPage() {
  // const { data: session, status } = useSession()
  
  //   useEffect(() => {
  //       if (status === 'authenticated') {
  //         console.log('User:', session?.user);
          
  //         console.log('Token:', session?.user?.token)
  //         console.log('User ID:', session?.user?.userId)
  //         console.log('User Type:', session?.user?.type)
  //         console.log('User views', session?.user?.views)
  //       } else if (status === 'unauthenticated') {
  //         console.log('No session available')
  //       }
  //     }, [status, session])


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
