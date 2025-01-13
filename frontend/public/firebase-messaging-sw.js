// Importar los scripts necesarios de Firebase
importScripts(
  'https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js',
)
importScripts(
  'https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js',
)

// Inicializar Firebase con la misma configuración del frontend
firebase.initializeApp({
  apiKey: 'AIzaSyAfP4ggJyuJEMXsX0uNUJ2foinqVFh75qs',
  authDomain: 'dental-rain-maker-e09be.firebaseapp.com',
  projectId: 'dental-rain-maker-e09be',
  storageBucket: 'dental-rain-maker-e09be.firebasestorage.app',
  messagingSenderId: '679351536261',
  appId: '1:679351536261:web:32de69efc586f8b4bc77ec',
})

// Inicializar el servicio de Firebase Messaging
const messaging = firebase.messaging()

// Listener para manejar notificaciones en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Mensaje recibido en segundo plano:',
    payload,
  )

  const notificationTitle = payload.notification?.title || 'Notificación'
  const notificationOptions = {
    body: payload.notification?.body || 'Tienes una nueva notificación',
    icon: payload.notification?.icon || '/default-icon.png', // Cambia este icono si es necesario
  }

  // Mostrar notificación
  self.registration.showNotification(notificationTitle, notificationOptions)
})
