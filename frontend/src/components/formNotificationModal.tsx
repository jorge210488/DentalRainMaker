'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { sendNotification } from '@/server/notifications'
import Swal from 'sweetalert2'
import { useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export enum NotificationType {
  PROMOTIONAL = 'PROMOTIONAL',
  REMINDER = 'REMINDER',
  NEWS = 'NEWS',
  BEHAVIORAL = 'BEHAVIORAL',
  RESCHEDULE = 'RESCHEDULE',
  CANCELLATION = 'CANCELLATION',
  OTHER = 'OTHER',
}

interface NotificationDialogProps {
  notificationOpen: boolean
  setNotificationOpen: Dispatch<SetStateAction<boolean>>
  remote_id: string
  given_name: string
  family_name: string
}

interface NotificationFormData {
  title: string
  body: string
  link?: string
  type: NotificationType
}

export function FormNotificationModal({
  notificationOpen,
  setNotificationOpen,
  remote_id,
  given_name,
  family_name,
}: NotificationDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<NotificationFormData>()

  const { data: session } = useSession()

  const clinics = useSelector((state: RootState) => state.clinics.clinics)

  const clinicName =
    clinics.find((clinic) => clinic._id === session?.user?.clinicId)
      ?.clinic_name || 'Unknown Clinic'

  const onSubmitForm: SubmitHandler<NotificationFormData> = async (data) => {
    try {
      if (session?.user?.token) {
        const notificationDto = {
          remote_id,
          clinic_id: session?.user?.clinicId || '',
          notification: {
            title: data.title,
            body: data.body,
          },
          data: {
            type: data.type,
          },
          webpush: {
            fcm_options: {
              link: data.link,
            },
          },
        }

        await sendNotification(notificationDto, session.user.token)

        setNotificationOpen(false)

        await Swal.fire({
          title: 'Success',
          text: 'Notification sent successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: true,
        })
      }
    } catch (error) {
      console.error('Failed to send notification:', error)

      setNotificationOpen(false)

      // Show error Swal
      await Swal.fire({
        title: 'Error',
        text: 'An error occurred while sending the notification. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: true,
      })
    }
  }

  return (
    <DialogContent className='w-[90%] font-sans sm:max-w-[800px]'>
      <DialogHeader>
        <DialogTitle className='font-bold'>Send Notification</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className='grid gap-1 py-2 sm:gap-2'>
          <div className='space-y-1'>
            <Label htmlFor='to'>To</Label>
            <Input
              id='to'
              type='text'
              value={`${given_name} ${family_name}`}
              disabled
              className='cursor-not-allowed bg-gray-100'
            />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              type='text'
              {...register('title', {
                required: 'Title is required',
              })}
              placeholder='Enter the notification title'
            />
            {errors.title && (
              <p className='text-sm text-red-500'>{errors.title.message}</p>
            )}
          </div>
          <div className='space-y-1'>
            <Label htmlFor='body'>Body</Label>
            <textarea
              id='body'
              {...register('body', {
                required: 'Body is required',
              })}
              placeholder='Enter the notification body'
              rows={4}
              className='w-full resize-none rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600'
            ></textarea>
            {errors.body && (
              <p className='text-sm text-red-500'>{errors.body.message}</p>
            )}
          </div>
          <div className='space-y-1'>
            <Label htmlFor='link'>
              URL (Default is Dental Rain Maker Page)
            </Label>
            <Input
              id='url'
              type='url'
              {...register('link')}
              placeholder='Enter a URL (Optional)'
            />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='type'>Type</Label>
            <select
              id='type'
              {...register('type', {
                required: 'Type is required',
              })}
              className='w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600'
            >
              <option value=''>Select</option>
              {Object.values(NotificationType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className='text-sm text-red-500'>{errors.type.message}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => {
              clearErrors()
              setNotificationOpen(!notificationOpen)
            }}
          >
            Cancel
          </Button>
          <Button
            type='button'
            variant='secondary'
            onClick={handleSubmit(async (data) => {
              if (session?.user?.token && session?.user?.userId) {
                const notificationDto = {
                  remote_id: session.user.userId, // Enviar al mismo usuario
                  clinic_id: session?.user?.clinicId || '',
                  notification: {
                    title: data.title,
                    body: data.body,
                  },
                  data: {
                    type: data.type,
                  },
                  webpush: {
                    fcm_options: {
                      link: data.link || '',
                    },
                  },
                }

                try {
                  await sendNotification(notificationDto, session.user.token)
                  setNotificationOpen(false) // Cerrar el modal antes del Swal
                  await Swal.fire({
                    title: 'Test Sent',
                    text: 'Test notification sent successfully to yourself.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                  })
                } catch (error) {
                  console.error('Failed to send test notification:', error)
                  setNotificationOpen(false)
                  await Swal.fire({
                    title: 'Error',
                    text: 'An error occurred while sending the test notification.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                  })
                }
              } else {
                setNotificationOpen(false)
                await Swal.fire({
                  title: 'Error',
                  text: 'Session data is missing. Please log in again.',
                  icon: 'error',
                  confirmButtonText: 'OK',
                })
              }
            })} // Usa handleSubmit para validar antes de enviar
          >
            Test Notification
          </Button>

          <Button type='submit'>Send Notification</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
