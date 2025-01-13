export const requestNotificationPermission = async (): Promise<boolean> => {
  if (Notification.permission === 'granted') {
    return true
  } else if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }
  console.error('Notification permission is blocked.')
  return false
}
