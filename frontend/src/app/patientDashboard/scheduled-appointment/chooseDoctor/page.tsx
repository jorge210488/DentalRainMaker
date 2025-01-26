'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, User2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type Doctor = {
  id: number
  name: string
  specialty: string
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Alvarez Carpio, Lucia Del Milagro',
    specialty: 'Dentistry',
  },
  {
    id: 2,
    name: 'Babilonia Curaca, Sandra',
    specialty: 'Dentistry',
  },
  {
    id: 3,
    name: 'Cardenas Paredes, Maria Del Carmen',
    specialty: 'Dentistry',
  },
]

const steps = [
  { number: 1, label: 'Doctor', active: true },
  { number: 2, label: 'Date & Time', active: false },
  { number: 3, label: 'Confirm', active: false },
]

export default function DoctorSelectionPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 lg:min-w-[160vh] dark:from-gray-900 dark:to-gray-800'>
      <div className='mx-auto max-w-4xl'>
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-12'
        >
          {/* Progress Steps */}
          <div className='mb-8'>
            <div className='relative mx-auto flex max-w-2xl justify-between'>
              {/* Progress Line */}
              <div className='absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200 dark:bg-gray-700' />

              {/* Steps */}
              {steps.map((step, index) => (
                <TooltipProvider key={step.number}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className='relative flex cursor-pointer flex-col items-center'
                        onClick={() => {
                          if (step.number === 1) {
                            router.push(
                              '/patientDashboard/scheduled-appointment/in-person',
                            )
                          }
                        }}
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            step.active
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                          } transition-colors`}
                        >
                          {step.number}
                        </div>
                        <span className='mt-2 text-sm font-medium'>
                          {step.label}
                        </span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Step {step.number}: {step.label}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className='text-center text-3xl font-bold tracking-tight'
          >
            Who do you want to see?
          </motion.h1>
        </motion.header>

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className='mx-auto max-w-2xl space-y-6'
        >
          {/* Search Section */}
          <div className='space-y-2'>
            <Label htmlFor='search'>Search for a doctor</Label>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500' />
              <Input
                id='search'
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter doctor's name"
                className='pl-9'
              />
            </div>
          </div>

          {/* Doctor List */}
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold tracking-tight'>
              Available doctors near you:
            </h2>

            <motion.div
              className='space-y-4'
              initial='hidden'
              animate='visible'
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <motion.div
                    key={doctor.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Card className='group overflow-hidden transition-all hover:shadow-md'>
                      <div className='flex items-center justify-between p-6'>
                        <div className='flex items-start gap-4'>
                          <div className='bg-primary/10 text-primary rounded-full p-2'>
                            <User2 className='h-6 w-6' />
                          </div>
                          <div>
                            <p className='text-muted-foreground text-sm font-medium'>
                              {doctor.specialty}
                            </p>
                            <h3 className='text-lg font-semibold'>
                              {doctor.name}
                            </h3>
                          </div>
                        </div>
                        <Button
                          onClick={() =>
                            router.push(
                              '/patientDashboard/scheduled-appointment/search-date',
                            )
                          }
                          className='transition-transform group-hover:scale-105'
                        >
                          Select
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='rounded-lg border border-dashed p-8 text-center'
                >
                  <p className='text-muted-foreground'>
                    No doctors found matching your search.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.main>
      </div>
    </div>
  )
}
