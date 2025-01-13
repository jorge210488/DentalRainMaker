'use client'

import { useEffect } from 'react'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { initializeApp } from 'firebase/app'
import { saveFirebaseTokenToServer } from '@/server/saveFirebaseToken'
import { useSession } from 'next-auth/react'

const firebaseConfig = {
  apiKey: 'AIzaSyAfP4ggJyuJEMXsX0uNUJ2foinqVFh75qs',
  authDomain: 'dental-rain-maker-e09be.firebaseapp.com',
  projectId: 'dental-rain-maker-e09be',
  storageBucket: 'dental-rain-maker-e09be.firebasestorage.app',
  messagingSenderId: '679351536261',
  appId: '1:679351536261:web:32de69efc586f8b4bc77ec',
}

const app = initializeApp(firebaseConfig)

const SaveFirebaseToken = () => {
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

    const requestPermission = async () => {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        console.error('Permiso de notificaciones no concedido.')
        throw new Error('Permiso de notificaciones no concedido')
      }
      console.log('Permiso de notificaciones concedido.')
    }

    const saveToken = async () => {
      try {
        // Registra el Service Worker
        const registration = await registerServiceWorker()

        // Solicita permisos para notificaciones
        await requestPermission()

        // Obtiene el token de Firebase Messaging
        const messaging = getMessaging(app)
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: registration,
        })

        if (token) {
          console.log('Token de Firebase obtenido:', token)

          // Enviar el token al servidor
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
      console.log('Message received in foreground:', payload)

      if (payload.notification) {
        const { title, body } = payload.notification
        console.log('Notification received:', title, body)

        // Mostrar notificación (puedes personalizar esta parte)
        alert(`Notification: ${title}\n${body}`)
      } else {
        console.warn('Notification payload is undefined or missing properties.')
      }
    })

    saveToken()
  }, [session])

  return null
}

export default SaveFirebaseToken
