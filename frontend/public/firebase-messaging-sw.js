// 📌 Importar scripts de Firebase
importScripts(
  'https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js',
)
importScripts(
  'https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js',
)

// 📌 Inicializar Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyAfP4ggJyuJEMXsX0uNUJ2foinqVFh75qs',
  authDomain: 'dental-rain-maker-e09be.firebaseapp.com',
  projectId: 'dental-rain-maker-e09be',
  storageBucket: 'dental-rain-maker-e09be.firebasestorage.app',
  messagingSenderId: '679351536261',
  appId: '1:679351536261:web:32de69efc586f8b4bc77ec',
})

// 📌 Inicializar Firebase Messaging
const messaging = firebase.messaging()

// 📌 Manejar notificaciones en segundo plano con Firebase
messaging.onBackgroundMessage((payload) => {
  console.log('📩 Firebase - Notificación en segundo plano recibida:', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
    data: { url: payload.notification.click_action || '/' },
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

// 📌 🔹 Integración de Brevo Web Push
self.addEventListener('push', function (event) {
  console.log('📩 Brevo - Notificación push recibida:', event)

  if (event.data) {
    const data = event.data.json()

    const notificationOptions = {
      body: data.body,
      icon: data.icon || '/default-icon.png', // Usa un ícono predeterminado si no hay uno en el mensaje
      data: { url: data.url || '/' }, // Redirigir al usuario al hacer clic
    }

    event.waitUntil(
      self.registration.showNotification(data.title, notificationOptions),
    )
  }
})

// 📌 🔹 Manejar clics en notificaciones (Firebase y Brevo)
self.addEventListener('notificationclick', function (event) {
  console.log('🔹 Notificación clickeada:', event.notification)

  event.notification.close()

  if (event.notification.data.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url))
  }
})
