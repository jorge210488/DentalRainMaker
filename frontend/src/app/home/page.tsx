'use client'

import React, { useState } from 'react'

import HomeView from '@/views/HomeView/Home'
import { SendSms } from '@/components/smsModal'
import { MessageCircle, Mail, Bell } from 'lucide-react'
import { Dialog } from '@/components/ui/dialog'
import { EmailModal } from '@/components/emailModal'
import { FormNotificationModal } from '@/components/formNotificationModal'
import { LookerStudioEmbed } from '@/components/LookerStudioEmbed'

const Home: React.FC = () => {
  const [smsOpen, setSmsOpen] = useState(false)
  const [emailOpen, setEmailOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)

  return (
    <>
      <HomeView />
      <div className='flex items-center space-x-2'>
        <span>Welcome, Guest </span>
        <button
          onClick={() => setSmsOpen(true)}
          className='flex items-center justify-center rounded p-2 hover:bg-gray-200'
        >
          <MessageCircle className='h-5 w-5 text-blue-500' />
        </button>
        <button
          onClick={() => setEmailOpen(true)}
          className='flex items-center justify-center rounded p-2 hover:bg-gray-200'
        >
          <Mail className='h-5 w-5 text-blue-500' />
        </button>
        <button
          onClick={() => setNotificationOpen(true)}
          className='flex items-center justify-center rounded p-2 hover:bg-gray-200'
        >
          <Bell className='h-5 w-5 text-blue-500' />
        </button>
      </div>

      {/* SMS Modal */}
      <Dialog open={smsOpen} onOpenChange={setSmsOpen}>
        <SendSms
          smsOpen={smsOpen}
          setSmsOpen={setSmsOpen}
          remote_id='804'
          phone_number='+541126309051'
        />
      </Dialog>

      {/* Email Modal */}
      <Dialog open={emailOpen} onOpenChange={setEmailOpen}>
        <EmailModal
          emailOpen={emailOpen}
          setEmailOpen={setEmailOpen}
          remote_id='804'
          email='jorgemartinez.jam@gmail.com'
          given_name='Jorge'
        />
      </Dialog>

      {/* Notification Modal */}
      <Dialog open={notificationOpen} onOpenChange={setNotificationOpen}>
        <FormNotificationModal
          notificationOpen={notificationOpen}
          setNotificationOpen={setNotificationOpen}
          remote_id='804'
          given_name='Jorge'
          family_name='Martínez'
        />
      </Dialog>
    </>
  )
}

export default Home
