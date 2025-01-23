export interface Notification {
  id: string
  remote_id: string
  clinic_id: string
  image: string
  title: string
  body: string
  type: string
  link: string
  isRead: boolean
  isSent: boolean
  sendAt: string
  createdAt: string
  updatedAt: string
}

export interface NotificationsState {
  notifications: Notification[]
  unreadCount: number
}
