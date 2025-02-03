'use client'

import { Metadata } from 'next'
import { DashboardHeader } from '@/components/patientDashboard/dashboard-header'
import LookerStudioEmbed from '@/components/LookerStudioEmbed'
const metadata: Metadata = {
  title: 'Dashboard | Dental Rain Maker',
  description: 'Manage your dental care and appointments',
}

export default function DashboardPage() {
  return (
    <div className='absolute left-2 w-[100%] p-8'>
      <DashboardHeader
        heading='Welcome back, Doctor'
        text='Manage your dental care journey'
      />
      <LookerStudioEmbed />
    </div>
  )
}
