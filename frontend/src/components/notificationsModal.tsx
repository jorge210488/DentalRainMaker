'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'

interface NotificationModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const sampleNotifications = [
  {
    notification: {
      title: '¡Descuento en blanqueamiento dental!',
      body: 'Aprovecha un 20% de descuento en blanqueamiento dental este mes.',
      image:
        'https://res.cloudinary.com/deflfnoba/image/upload/v1736293681/DentalRainMaker%20Frontend/xpt6bwxwovvscuh3irci.png',
    },
    remote_id: '804',
    clinic_id: 'fb8ce23f-8fed-4911-8fdf-ed4a5c9dd306',
    data: {
      type: 'REMINDER',
    },
    webpush: {
      fcm_options: {
        link: 'https://dental-rain-maker.vercel.app/',
      },
    },
  },
  {
    notification: {
      title: 'Nueva promoción en limpieza dental',
      body: 'Obtén un 15% de descuento en tu próxima cita.',
      image:
        'https://res.cloudinary.com/deflfnoba/image/upload/v1736293681/DentalRainMaker%20Frontend/xpt6bwxwovvscuh3irci.png',
    },
    remote_id: '805',
    clinic_id: 'fb8ce23f-8fed-4911-8fdf-ed4a5c9dd306',
    data: {
      type: 'PROMOTION',
    },
    webpush: {
      fcm_options: {
        link: 'https://dental-rain-maker.vercel.app/',
      },
    },
  },
]

const clinics = [
  { id: 'fb8ce23f-8fed-4911-8fdf-ed4a5c9dd306', name: 'Dental Clinic ABC' },
]

export function NotificationModal({
  isOpen,
  setIsOpen,
}: NotificationModalProps) {
  const handleRedirect = (link: string) => {
    window.location.href = link
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='w-[90%] font-sans sm:max-w-[425px]'>
        <DialogHeader className='flex items-center justify-between'>
          <h2 className='text-lg font-bold'>Notifications</h2>
        </DialogHeader>

        <div className='space-y-6'>
          {sampleNotifications.map((notificationData, index) => {
            const { notification, clinic_id, data, webpush } = notificationData
            const clinicName = clinics.find(
              (clinic) => clinic.id === clinic_id,
            )?.name
            const typeFormatted =
              data.type.charAt(0).toUpperCase() +
              data.type.slice(1).toLowerCase()

            return (
              <div
                key={index}
                className={`border-b border-gray-300 pb-4 ${
                  index === 0 ? 'mt-2 border-t pt-4' : ''
                }`}
              >
                <div
                  className='cursor-pointer space-y-2'
                  onClick={() => handleRedirect(webpush.fcm_options.link)}
                >
                  {/* Fila 1: Type */}
                  <div className='flex justify-end text-sm font-medium text-gray-600'>
                    {typeFormatted}
                  </div>

                  {/* Fila 2: Title */}
                  <div className='text-base font-bold text-gray-900'>
                    {notification.title}
                  </div>

                  {/* Fila 3: Body */}
                  <div className='text-sm text-gray-700'>
                    {notification.body}
                  </div>

                  {/* Fila 4: Clinic Name */}
                  <div className='flex justify-end text-sm font-medium text-gray-500'>
                    {clinicName || 'Unknown Clinic'}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
