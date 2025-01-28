'use client'

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import { CircleAlert } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { RootState } from '@/redux/store'
import { updateNotification } from '@/server/notifications'
import { markNotificationAsRead } from '@/redux/slices/notificationsSlice'
import { useSession } from 'next-auth/react'
import { Clinic } from '@/redux/types/clinic.interface'

interface NotificationModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NotificationModal = ({ isOpen, setIsOpen }: NotificationModalProps) => {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications,
  )
  const clinics = useSelector((state: RootState) => state.clinics.clinics)
  const { data: session } = useSession()
  const dispatch = useDispatch()
  const [showAll, setShowAll] = useState(false)

  const handleNotificationClick = async (
    notificationId: string,
    link: string,
  ) => {
    try {
      if (session?.user?.token) {
        await updateNotification(
          notificationId,
          { isRead: true },
          session.user.token,
        )
        dispatch(markNotificationAsRead(notificationId))
        window.location.href = link
      }
    } catch (error) {
      console.error('Failed to update notification:', error)
    }
  }

  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='w-[90%] max-w-md font-sans sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
        </DialogHeader>
        <div
          className={`space-y-4 ${showAll ? 'max-h-[400px] overflow-y-auto' : 'max-h-[300px] overflow-hidden'}`}
        >
          {sortedNotifications
            .slice(0, showAll ? sortedNotifications.length : 5)
            .map((notification, index) => {
              const clinic = clinics.find(
                (clinic: Clinic) => clinic._id === notification.clinic_id,
              )
              const clinicName = clinic?.clinic_name || 'Unknown Clinic'

              return (
                <a
                  key={notification.id}
                  href={notification.link}
                  className='relative flex cursor-pointer items-center border-b border-gray-100 px-4 py-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700'
                  onClick={() =>
                    handleNotificationClick(notification.id, notification.link)
                  }
                >
                  <div className='flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-md'>
                    <Image
                      className='rounded-full'
                      src='https://res.cloudinary.com/deflfnoba/image/upload/v1736293681/DentalRainMaker%20Frontend/xpt6bwxwovvscuh3irci.png'
                      alt='avatar'
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className='mx-2 flex w-full flex-col text-sm text-gray-600 dark:text-white'>
                    <span className='font-bold'>{notification.title}</span>
                    <span>{notification.body}</span>
                    <div className='flex justify-between'>
                      <span className='text-blue-500 hover:underline'>
                        {clinicName}
                      </span>
                      <span className='text-gray-500'>{notification.type}</span>
                    </div>
                  </div>
                  {!notification.isRead && (
                    <CircleAlert
                      className='absolute right-2 top-2 text-red-500'
                      size={18}
                    />
                  )}
                </a>
              )
            })}
        </div>
        {!showAll && sortedNotifications.length > 5 && (
          <button
            onClick={() => setShowAll(true)}
            className='block w-full bg-gray-800 py-2 text-center font-bold text-white hover:underline dark:bg-gray-700'
          >
            See all notifications
          </button>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default NotificationModal
