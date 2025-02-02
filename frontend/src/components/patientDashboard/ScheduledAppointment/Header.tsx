'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()

  return (
    <header className='mb-6'>
      <div className='mb-8 flex items-center justify-center gap-6'>
        <div
          onClick={() =>
            router.push(
              '/pages/patientDashboard/scheduled-appointment/chooseDoctor',
            )
          }
          className='flex cursor-pointer items-center'
        >
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white'>
            1
          </div>
          <span className='ml-2 text-sm font-semibold'>Doctor</span>
        </div>
        <div
          onClick={() =>
            router.push(
              '/pages/patientDashboard/scheduled-appointment/search-date',
            )
          }
          className='flex cursor-pointer items-center'
        >
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white'>
            2
          </div>
          <span className='ml-2 text-sm font-semibold'>Date & Time</span>
        </div>
        <div className='flex items-center'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-white'>
            3
          </div>
          <span className='ml-2 text-sm font-semibold'>Confirm</span>
        </div>
      </div>
    </header>
  )
}

export default Header
