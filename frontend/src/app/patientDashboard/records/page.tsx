'use client'

import { useState } from 'react'
import { Search, Filter, Calendar, SmileIcon as Tooth } from 'lucide-react'
import { DashboardShell } from '@/components/patientDashboard/dashboard-shell'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Treatment {
  id: string
  date: string
  procedure: string
  tooth: string
  dentist: string
  notes: string
  cost: number
}

const mockTreatments: Treatment[] = [
  {
    id: '1',
    date: '2024-01-15',
    procedure: 'Root Canal',
    tooth: '16',
    dentist: 'Dr. Smith',
    notes: 'Successful procedure, follow-up in 2 weeks',
    cost: 800,
  },
  {
    id: '2',
    date: '2023-12-20',
    procedure: 'Dental Cleaning',
    tooth: 'All',
    dentist: 'Dr. Johnson',
    notes: 'Regular cleaning, no issues found',
    cost: 150,
  },
  // Add more mock treatments as needed
]

export default function RecordsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [treatments, setTreatments] = useState<Treatment[]>(mockTreatments)

  return (
    <div className='mx-auto max-w-[1200px] p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold text-gray-900'>
            Treatment Records
          </h1>
          <p className='mt-1 text-gray-500'>
            View and manage patient treatment history
          </p>
        </div>
        <Button variant='default' className='bg-blue-600 hover:bg-blue-700'>
          Export Records
        </Button>
      </div>

      {/* Filters Section */}
      <Card className='mb-6'>
        <CardContent className='p-4'>
          <div className='flex flex-wrap gap-4'>
            <div className='min-w-[200px] flex-1'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
                <Input
                  placeholder='Search treatments...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10'
                />
              </div>
            </div>
            <Select>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Filter by Procedure' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Procedures</SelectItem>
                <SelectItem value='cleaning'>Cleaning</SelectItem>
                <SelectItem value='rootcanal'>Root Canal</SelectItem>
                <SelectItem value='filling'>Filling</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Filter by Dentist' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Dentists</SelectItem>
                <SelectItem value='smith'>Dr. Smith</SelectItem>
                <SelectItem value='johnson'>Dr. Johnson</SelectItem>
              </SelectContent>
            </Select>
            <Button variant='outline' className='flex items-center gap-2'>
              <Filter className='h-4 w-4' />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Records List */}
      <div className='space-y-4'>
        {treatments.map((treatment) => (
          <Card
            key={treatment.id}
            className='transition-colors hover:bg-gray-50'
          >
            <CardContent className='p-6'>
              <div className='flex items-start justify-between'>
                <div className='flex items-start gap-4'>
                  <div className='rounded-lg bg-blue-100 p-3'>
                    <Tooth className='h-6 w-6 text-blue-600' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      {treatment.procedure}
                    </h3>
                    <div className='mt-1 flex items-center gap-2 text-sm text-gray-500'>
                      <Calendar className='h-4 w-4' />
                      {new Date(treatment.date).toLocaleDateString()}
                    </div>
                    <p className='mt-2 text-sm text-gray-600'>
                      {treatment.notes}
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-semibold text-gray-900'>
                    ${treatment.cost}
                  </p>
                  <p className='text-sm text-gray-500'>
                    Tooth: {treatment.tooth}
                  </p>
                  <p className='text-sm text-gray-500'>{treatment.dentist}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
