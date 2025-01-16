'use client'

import { useEffect } from 'react'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { initializeApp } from 'firebase/app'
import { saveFirebaseTokenToServer } from '@/server/saveFirebaseToken'
import { useSession } from 'next-auth/react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

// Componente de notificación personalizado
const NotificationContent = ({
  title,
  body,
  imageUrl,
}: {
  title: string
  body: string
  imageUrl: string
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={imageUrl}
        alt='Notification'
        style={{
          width: '100px',
          height: '50px',
          borderRadius: '8px',
          marginRight: '10px',
        }}
      />
      <div>
        <h4 style={{ margin: 0 }}>{title}</h4>
        <p style={{ margin: 0 }}>{body}</p>
      </div>
    </div>
  )
}

const FirebaseNotification = () => {
  const { data: session } = useSession()

  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register(
            '/firebase-messaging-sw.js',
          )
          console.log('Service Worker registrado con éxito:', registration)
          return registration
        } catch (error) {
          console.error('Error al registrar el Service Worker:', error)
          throw error
        }
      } else {
        console.error('Service Workers no son compatibles en este navegador.')
        throw new Error('Service Workers no compatibles')
      }
    }

    const saveToken = async () => {
      try {
        const registration = await registerServiceWorker()

        const messaging = getMessaging(app)
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: registration,
        })

        if (token) {
          console.log('Token de Firebase obtenido:', token)

          if (session?.user?.userId && session?.user?.token) {
            await saveFirebaseTokenToServer(
              session.user.userId,
              token,
              session.user.token,
            )
          } else {
            console.error(
              'No se encontró el userId o el Bearer token en la sesión.',
            )
          }
        } else {
          console.log('No se pudo obtener el token de registro.')
        }
      } catch (error) {
        console.error('Error al guardar el token de Firebase:', error)
      }
    }

    // Escuchar notificaciones en primer plano
    const messaging = getMessaging(app)
    onMessage(messaging, (payload) => {
      const { title, body, image } = payload.notification || {}
      console.log('Foreground notification received:', title, body)

      // Llamar al toast con un contenido personalizado
      toast.info(
        <NotificationContent
          title={title || ''}
          body={body || ''}
          imageUrl={image || ''}
        />,
      )
    })

    saveToken()
  }, [session])

  return (
    <>
      <ToastContainer />
    </>
  )
}

export default FirebaseNotification
