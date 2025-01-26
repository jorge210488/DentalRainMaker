'use client'

import { useRouter } from 'next/navigation'
import { Calendar, MapPin, Plus, User2, Video } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useEffect, useState } from 'react'
import Header from '@/components/patientDashboard/Appointments/Header'
import Filters from '@/components/patientDashboard/Appointments/Filters'
import AppointmentsList from '@/components/patientDashboard/Appointments/AppointmentList'
import { useSession } from 'next-auth/react'
import { getAppointmentsByContactId } from '@/server/appointments'

export type Appointment = {
  remote_id: string
  doctor: string
  operator: string
  speciality: string
  patient: string
  date: string
  time: string
  location: string
  attention_type: 'In-person' | 'Virtual'
  paymentStatus: 'Pending' | 'Paid'
}

export default function AppointmentsDashboard() {
  const router = useRouter()
  const [primaryFilter, setPrimaryFilter] = useState('Upcoming')
  const [secondaryFilter, setSecondaryFilter] = useState('All')

  // This would come from your data source
  const filteredAppointments: Appointment[] = [
    {
      remote_id: '1',
      doctor: 'Dr. Sarah Wilson',
      speciality: 'Cardiologist',
      patient: 'John Doe',
      operator: 'nn',
      date: '2024-01-25',
      time: '10:00 AM',
      location: 'Medical Center',
      paymentStatus: 'Pending',
      attention_type: 'In-person',
    },
    // Add more appointments as needed
  ]

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 lg:w-[87%] dark:from-gray-900 dark:to-gray-800'>
      <main className='container mx-auto px-4 py-8 sm:px-6 lg:ml-24 lg:px-8'>
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'
        >
          <div>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100'>
              My Appointments
            </h1>
            <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
              Manage your upcoming and past appointments
            </p>
          </div>
          <Button
            onClick={() =>
              router.push('/patientDashboard/scheduled-appointment')
            }
            size='lg'
            className='group'
          >
            <Plus className='mr-2 h-4 w-4 transition-transform group-hover:rotate-90' />
            Schedule Appointment
          </Button>
        </motion.header>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='mb-8 space-y-4'
        >
          {/* Primary Filter */}
          <Tabs defaultValue={primaryFilter} onValueChange={setPrimaryFilter}>
            <TabsList className='grid w-full max-w-[400px] grid-cols-2'>
              <TabsTrigger value='History'>History</TabsTrigger>
              <TabsTrigger value='Upcoming'>Upcoming</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Secondary Filter */}
          <Tabs
            defaultValue={secondaryFilter}
            onValueChange={setSecondaryFilter}
          >
            <TabsList>
              <TabsTrigger value='All'>All</TabsTrigger>
              <TabsTrigger value='In-person'>In-person</TabsTrigger>
              <TabsTrigger value='Virtual'>Virtual</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Appointment List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'
        >
          <AnimatePresence>
            {filteredAppointments.map((appointment) => (
              <motion.div
                key={appointment.remote_id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className='group overflow-hidden'>
                  <div className='relative p-6'>
                    <div className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-75' />

                    {/* Status Badge */}
                    <div className='mb-4 flex items-center justify-between'>
                      <Badge
                        variant={
                          appointment.paymentStatus === 'Paid'
                            ? 'outline'
                            : 'destructive'
                        }
                      >
                        {appointment.paymentStatus}
                      </Badge>
                      {appointment.attention_type === 'Virtual' ? (
                        <Video className='h-5 w-5 text-blue-500' />
                      ) : (
                        <MapPin className='h-5 w-5 text-blue-500' />
                      )}
                    </div>

                    {/* Appointment Details */}
                    <div className='space-y-4'>
                      <div>
                        <h2 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100'>
                          {appointment.doctor}
                        </h2>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                          {appointment.speciality}
                        </p>
                      </div>

                      <div className='space-y-2'>
                        <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                          <User2 className='h-4 w-4' />
                          {appointment.patient}
                        </div>
                        <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                          <Calendar className='h-4 w-4' />
                          {appointment.date} at {appointment.time}
                        </div>
                        <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                          <MapPin className='h-4 w-4' />
                          {appointment.location}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className='flex items-center justify-end gap-2 pt-4'>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant='outline' size='sm'>
                                Reschedule
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Reschedule this appointment</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {appointment.paymentStatus === 'Pending' && (
                          <Button size='sm'>Pay Now</Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredAppointments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='mt-8 text-center'
          >
            <div className='rounded-full bg-gray-100 p-4 dark:bg-gray-800'>
              <Calendar className='mx-auto h-12 w-12 text-gray-400' />
            </div>
            <h3 className='mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100'>
              No appointments found
            </h3>
            <p className='mt-2 text-gray-500 dark:text-gray-400'>
              Try adjusting your filters or schedule a new appointment.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  )
}
