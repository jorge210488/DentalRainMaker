'use client'

import { useSelector, useDispatch } from 'react-redux'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { RootState } from '@/redux/store'
import { updateNotification } from '@/server/notifications'
import { markNotificationAsRead } from '@/redux/slices/notificationsSlice'
import { useSession } from 'next-auth/react'
import { Clinic } from '@/redux/types/clinic.interface'

interface NotificationModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function NotificationModal({
  isOpen,
  setIsOpen,
}: NotificationModalProps) {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications,
  )
  const clinics = useSelector((state: RootState) => state.clinics.clinics)
  const { data: session } = useSession()
  const dispatch = useDispatch()

  const handleNotificationClick = async (
    notificationId: string,
    link: string,
  ) => {
    try {
      if (session?.user?.token) {
        // Actualiza la notificación en el backend
        await updateNotification(
          notificationId,
          { isRead: true },
          session.user.token,
        )

        // Actualiza el estado del slice
        dispatch(markNotificationAsRead(notificationId))

        // Redirige al enlace
        window.location.href = link
      }
    } catch (error) {
      console.error('Failed to update notification:', error)
    }
  }

  // Ordenar las notificaciones por createdAt, de más nueva a más vieja
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='w-[90%] font-sans sm:max-w-[425px]'>
        <DialogHeader className='flex items-center justify-between'>
          <h2 className='text-lg font-bold'>Notifications</h2>
        </DialogHeader>

        <div className='space-y-6'>
          {sortedNotifications.length > 0 ? (
            sortedNotifications.map((notification, index) => {
              const clinic = clinics.find(
                (clinic: Clinic) => clinic._id === notification.clinic_id,
              )
              const clinicName = clinic?.clinic_name || 'Unknown Clinic'

              return (
                <div
                  key={notification.id}
                  className={`border-b border-gray-300 pb-4 ${
                    index === 0 ? 'mt-2 border-t pt-4' : ''
                  } ${
                    !notification.isRead
                      ? 'bg-[#f0f8ff]' // Fondo azul claro si isRead es false
                      : ''
                  }`}
                >
                  <div
                    className='cursor-pointer space-y-2'
                    onClick={() =>
                      handleNotificationClick(
                        notification.id,
                        notification.link,
                      )
                    }
                  >
                    {/* Fila 1: Type */}
                    <div className='flex justify-end text-sm font-medium text-gray-600'>
                      {notification.type}
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
                      {clinicName}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className='text-center text-gray-600'>
              No notifications available.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
