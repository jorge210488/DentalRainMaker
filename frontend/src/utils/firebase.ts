import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

// Configuración de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAfP4ggJyuJEMXsX0uNUJ2foinqVFh75qs',
  authDomain: 'dental-rain-maker-e09be.firebaseapp.com',
  projectId: 'dental-rain-maker-e09be',
  storageBucket: 'dental-rain-maker-e09be.firebasestorage.app',
  messagingSenderId: '679351536261',
  appId: '1:679351536261:web:32de69efc586f8b4bc77ec',
}

const app = initializeApp(firebaseConfig)

// Configura Firebase Messaging
export const setupFirebaseMessaging = async (): Promise<string | null> => {
  const messaging = getMessaging(app)

  try {
    // Verifica y solicita permisos de notificaciones
    if (Notification.permission === 'default') {
      console.log('Requesting notification permission...')
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        console.error('Notification permission not granted.')
        return null
      }
    }

    // Obtiene el token de Firebase Messaging
    const token = await getToken(messaging, {
      vapidKey:
        'BN8rYw9nXlHeLFpEtuHqakAGzRJlnxiZ0_9vF7t9oiE4ul0anHGXYPAMu9rmcyaTcE2_CWRqKdiEYMUaAftVdBQ',
    })

    if (token) {
      console.log('Firebase Messaging Token:', token)
    } else {
      console.warn('No Firebase token was retrieved.')
    }

    return token || null
  } catch (error) {
    console.error('Error al obtener el token de Firebase:', error)
    return null
  }
}

// Listener de mensajes en primer plano
export const registerForegroundMessageHandler = (): void => {
  const messaging = getMessaging(app)

  if (typeof window !== 'undefined' && messaging) {
    onMessage(messaging, (payload) => {
      console.log('Message received in foreground:', payload)
    })
  }
}
