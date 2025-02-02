'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight, Users, Video } from 'lucide-react'
import { motion } from 'framer-motion'

import { Card } from '@/components/ui/card'

export default function AppointmentScheduler() {
  const router = useRouter()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800'>
      <div className='container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='max-w-2xl text-center'
        >
          <h1 className='bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl'>
            Schedule Your Next Appointment
          </h1>
          <p className='mt-4 text-lg text-gray-600 sm:text-xl dark:text-gray-300'>
            Choose between virtual or in-person consultations with our
            specialists
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial='hidden'
          animate='show'
          className='mt-12 grid w-full max-w-3xl gap-6 px-4 sm:grid-cols-2 sm:px-6'
        >
          {/* In-Person Appointment Card */}
          <motion.div variants={item}>
            <Card
              onClick={() =>
                router.push(
                  '/pages/patientDashboard/scheduled-appointment/chooseDoctor',
                )
              }
              className='group relative cursor-pointer overflow-hidden transition-all hover:shadow-lg dark:bg-gray-800'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 transition-opacity group-hover:opacity-100' />
              <div className='relative space-y-4 p-6'>
                <div className='inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'>
                  <Users className='h-6 w-6' />
                </div>
                <div>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                    In-Person Appointment
                  </h3>
                  <p className='mt-2 text-gray-600 dark:text-gray-300'>
                    Meet face-to-face with our healthcare professionals
                  </p>
                </div>
                <div className='flex items-center justify-between pt-4'>
                  <span className='text-sm font-medium text-blue-600 dark:text-blue-400'>
                    Book now
                  </span>
                  <ArrowRight className='h-5 w-5 transform text-blue-600 transition-transform group-hover:translate-x-1 dark:text-blue-400' />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Virtual Appointment Card */}
          <motion.div variants={item}>
            <Card
              onClick={() =>
                router.push(
                  '/pages/patientDashboard/scheduled-appointment/chooseDoctor',
                )
              }
              className='group relative cursor-pointer overflow-hidden transition-all hover:shadow-lg dark:bg-gray-800'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100' />
              <div className='relative space-y-4 p-6'>
                <div className='inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'>
                  <Video className='h-6 w-6' />
                </div>
                <div>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                    Virtual Appointment
                  </h3>
                  <p className='mt-2 text-gray-600 dark:text-gray-300'>
                    Connect with specialists from the comfort of your home
                  </p>
                </div>
                <div className='flex items-center justify-between pt-4'>
                  <span className='text-sm font-medium text-indigo-600 dark:text-indigo-400'>
                    Book now
                  </span>
                  <ArrowRight className='h-5 w-5 transform text-indigo-600 transition-transform group-hover:translate-x-1 dark:text-indigo-400' />
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
