export interface NotificationContent {
  title: string
  body: string
  image?: string
}

export interface NotificationData {
  type: string
  url?: string
  promoCode?: string
  appointmentId?: string
}

export interface WebpushFcmOptions {
  link?: string
}

export interface Webpush {
  fcm_options: WebpushFcmOptions
}

export interface CreateNotificationDto {
  notification: NotificationContent
  remote_id: string
  clinic_id: string
  data?: NotificationData
  webpush?: Webpush
  sendAt?: string
}

export const fetchNotificationsByUser = async (
  clinicId: string,
  remoteId: string,
  bearerToken: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notifications/user/${encodeURIComponent(remoteId)}?clinic_id=${encodeURIComponent(clinicId)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error('Failed to fetch notifications by user.')
    }

    const notifications = await response.json()

    console.log('asi me llegan', notifications)

    // Transformar los datos al formato del slice
    const transformedNotifications = notifications.map((notification: any) => ({
      id: notification._id,
      remote_id: notification.remote_id || '',
      clinic_id: notification.clinic_id || '',
      image: notification.notification.image || '',
      title: notification.notification.title || '',
      body: notification.notification.body || '',
      type: notification.data.type || '',
      link: notification.webpush?.fcm_options.link || '',
      isRead: notification.isRead || false,
      isSent: notification.isSent || false,
      sendAt: notification.sendAt || '',
      createdAt: notification.createdAt || '',
      updatedAt: notification.updatedAt || '',
    }))

    console.log(
      'Notifications transformed successfully:',
      transformedNotifications,
    )
    return transformedNotifications
  } catch (error) {
    console.error('Error fetching notifications by user:', error)
    throw error
  }
}

export const updateNotification = async (
  id: string,
  updateNotificationDto: Record<string, any>,
  bearerToken: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notifications/${encodeURIComponent(id)}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(updateNotificationDto),
      },
    )

    if (!response.ok) {
      throw new Error('Failed to update notification.')
    }

    const updatedNotification = await response.json()

    console.log(
      `Notification with ID ${id} updated successfully:`,
      updatedNotification,
    )

    return updatedNotification
  } catch (error) {
    console.error('Error updating notification:', error)
    throw error
  }
}

export const sendNotification = async (
  notificationData: CreateNotificationDto,
  bearerToken: string,
): Promise<void> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notifications/send`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(notificationData),
      },
    )

    if (!response.ok) {
      throw new Error('Failed to send notification.')
    }

    const result = await response.json()

    console.log('Notification sent successfully:', result)
  } catch (error) {
    console.error('Error sending notification:', error)
    throw error
  }
}
