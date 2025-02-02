'use client'

import { useRouter } from 'next/navigation'
import { format, isSameDay, parseISO } from 'date-fns'
import { CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card } from '@/components/ui/card'

import React, { useState } from 'react'
import Header from '@/components/patientDashboard/ScheduledAppointment/Header'
import CalendarComponent from '@/components/patientDashboard/ScheduledAppointment/Calendar'
import AvailableSlots from '@/components/patientDashboard/ScheduledAppointment/AvailableSlots'
import ConfirmButton from '@/components/patientDashboard/ScheduledAppointment/ConfirmButton'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const appointmentSlots = [
  {
    date: '2025-02-03',
    day: 'Wednesday',
    times: ['8:00:00', '9:00:00', '10:00:00', '11:00:00'],
  },
  {
    date: '2025-01-31',
    day: 'Thursday',
    times: ['10:00:00', '11:00:00', '12:00:00', '13:00:00'],
  },
  {
    date: '2025-01-29',
    day: 'Tuesday',
    times: ['14:00:00', '15:00:00', '16:00:00', '17:00:00'],
  },
]

export default function AppointmentsDateTime() {
  const dispatch = useDispatch()
  const appointment = useSelector((state: RootState) => state.appointmentPost)

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [filteredSlots, setFilteredSlots] = useState(appointmentSlots)

  const handleDateChange = (value: Date | null) => {
    if (value) {
      setSelectedDate(value)
      const formattedDate = value.toISOString().split('T')[0]
      const slotsForSelectedDate = appointmentSlots.filter(
        (slot) => slot.date === formattedDate,
      )
      setFilteredSlots(slotsForSelectedDate)
    } else {
      setSelectedDate(null)
      setFilteredSlots([])
    }
    setSelectedTime(null)
  }

  const isWeekday = (date: Date) => {
    const day = date.getDay()
    return day !== 0 && day !== 6
  }

  console.log('asi va quedando la cita', appointment)

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <Header />
      <div className='text-center'>
        <h1 className='mb-4 text-2xl font-bold'>Date and Time</h1>
        <div className='sm:flex sm:items-start sm:justify-center sm:space-x-6'>
          <CalendarComponent
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            isWeekday={isWeekday}
          />
          <AvailableSlots
            selectedDate={selectedDate}
            slots={filteredSlots}
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
          />
        </div>
      </div>
      <ConfirmButton selectedTime={selectedTime} />
    </div>
  )
}
