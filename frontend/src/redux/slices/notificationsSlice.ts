import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Notification {
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

interface NotificationsState {
  notifications: Notification[]
  unreadCount: number
}

const initialState: NotificationsState = {
  notifications: [],
  unreadCount: 0,
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<Notification[]>) {
      state.notifications = action.payload
      state.unreadCount = action.payload.filter((n) => !n.isRead).length
    },
    addNotification(state, action: PayloadAction<Notification>) {
      state.notifications.unshift(action.payload)
      if (!action.payload.isRead) {
        state.unreadCount += 1
      }
    },
    markNotificationAsRead(state, action: PayloadAction<string>) {
      const notification = state.notifications.find(
        (n) => n.id === action.payload,
      )
      if (notification && !notification.isRead) {
        notification.isRead = true
        state.unreadCount -= 1
      }
    },
    markAllAsRead(state) {
      state.notifications.forEach((n) => {
        if (!n.isRead) {
          n.isRead = true
        }
      })
      state.unreadCount = 0
    },
    clearNotifications(state) {
      state.notifications = []
      state.unreadCount = 0
    },
  },
})

export const {
  setNotifications,
  addNotification,
  markNotificationAsRead,
  markAllAsRead,
  clearNotifications,
} = notificationsSlice.actions

export default notificationsSlice.reducer
