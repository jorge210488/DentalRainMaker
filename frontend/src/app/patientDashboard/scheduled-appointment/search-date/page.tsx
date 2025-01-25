'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { format, isSameDay, parseISO } from 'date-fns'
import { CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card } from '@/components/ui/card'

type AppointmentSlot = {
  date: string
  day: string
  times: string[]
}

const appointmentSlots: AppointmentSlot[] = [
  {
    date: '2025-01-15',
    day: 'Wednesday',
    times: ['2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'],
  },
  // ... rest of the appointment slots
]

export default function AppointmentsDateTime() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [view, setView] = useState<'calendar' | 'slots'>('calendar')

  // Get available times for selected date
  const getAvailableTimesForDate = (date: Date) => {
    const slot = appointmentSlots.find((slot) =>
      isSameDay(parseISO(slot.date), date),
    )
    return slot?.times || []
  }

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    // Delay the view change slightly to make it smoother
    setTimeout(() => setView('slots'), 100)
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 lg:min-w-[160vh]'>
      <div className='mx-auto max-w-2xl'>
        <Card className='overflow-hidden'>
          <AnimatePresence mode='wait'>
            {view === 'calendar' ? (
              <motion.div
                key='calendar'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className='lg:align-content-center p-6 lg:items-center'
              >
                <div className='mb-6 space-y-4'>
                  <h2 className='text-2xl font-semibold'>Select a Date</h2>
                  <p className='text-muted-foreground text-sm'>
                    Available dates are highlighted below
                  </p>
                </div>

                <Calendar
                  mode='single'
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className='rounded-md border'
                  modifiers={{
                    available: (date) =>
                      appointmentSlots.some((slot) =>
                        isSameDay(parseISO(slot.date), date),
                      ),
                  }}
                  modifiersStyles={{
                    available: {
                      fontWeight: 'bold',
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                    },
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key='time-slots'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className='p-6'
              >
                <div className='mb-6 space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h2 className='text-2xl font-semibold'>Select a Time</h2>
                      <p className='text-muted-foreground text-sm'>
                        {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
                      </p>
                    </div>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => setView('calendar')}
                      className='text-black-600 flex items-center gap-2 font-extrabold'
                    >
                      <ChevronLeft className='h-5 w-5 font-extrabold' />
                      Back to Calendar
                    </Button>
                  </div>
                </div>

                <motion.div
                  className='grid grid-cols-2 gap-3 sm:grid-cols-3'
                  initial='hidden'
                  animate='visible'
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  {selectedDate &&
                    getAvailableTimesForDate(selectedDate).map((time) => (
                      <motion.div
                        key={time}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        <Button
                          variant={
                            selectedTime === time ? 'default' : 'outline'
                          }
                          className='w-full'
                          onClick={() => setSelectedTime(time)}
                        >
                          <Clock className='mr-2 h-4 w-4' />
                          {time}
                        </Button>
                      </motion.div>
                    ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className='bg-muted/50 border-t p-6'>
            <div className='flex items-center justify-between'>
              <Button
                variant='outline'
                onClick={() =>
                  router.push(
                    '/patientDashboard/scheduled-appointment/chooseDoctor',
                  )
                }
                className='font-bold text-red-600'
              >
                <ChevronLeft className='mr-2 h-5 w-5 text-red-600' />
                Previous
              </Button>

              <Button
                onClick={() =>
                  router.push('/patientDashboard/scheduled-appointment/confirm')
                }
                disabled={!selectedDate || !selectedTime}
              >
                Next
                <ChevronRight className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </div>
        </Card>

        {/* Selected Time Summary */}
        <AnimatePresence>
          {selectedDate && selectedTime && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className='mt-4'
            >
              <Card className='p-4'>
                <div className='flex items-center gap-4'>
                  <div className='flex items-center gap-2'>
                    <CalendarIcon className='text-muted-foreground h-4 w-4' />
                    <span>{format(selectedDate, 'MMMM d, yyyy')}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Clock className='text-muted-foreground h-4 w-4' />
                    <span>{selectedTime}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
