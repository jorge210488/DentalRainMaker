import NextAuth from 'next-auth'

declare module 'next-auth' {
  // Interfaz para el objeto `User`
  interface User {
    token?: string // 🔹 Se cambia de `id_token` a `token`
    userId?: string // 🔹 Se cambia de `user_id` a `userId`
    type?: string
    views?: string[]
    clinicId?: string
  }

  // Interfaz para el token JWT
  interface JWT {
    id?: string // ID único (Google o credenciales)
    accessToken?: string // Token de acceso
    userId?: string // ID único del usuario
    type?: string // Tipo de usuario
    provider?: string // Proveedor (e.g., google, credentials)
    name?: string // Nombre del usuario
    email?: string // Correo electrónico del usuario
    given_name?: string // Nombre de pila
    family_name?: string // Apellido
    views?: string[] // Vistas asociadas al usuario
    clinicId?: string // ID único de la clinica del usuario
  }

  // Interfaz para la sesión
  interface Session {
    user: {
      id?: string // ID único del usuario
      token?: string // Token de acceso
      userId?: string // ID único del usuario
      type?: string // Tipo de usuario
      provider?: string // Proveedor
      name?: string // Nombre del usuario
      email?: string // Correo electrónico del usuario
      given_name?: string // Nombre de pila
      family_name?: string // Apellido
      views?: string[] // Vistas asociadas al usuario
      clinicId?: string // ID único de la clinica del usuario
    }
  }

  // Interfaz para el perfil (opcional, basado en datos de Google)
  interface Profile {
    given_name?: string // Nombre de pila
    family_name?: string // Apellido
    email?: string // Correo electrónico
    name?: string // Nombre completo
    picture?: string // URL de la imagen del perfil
  }

  interface Account {
    provider: string
    type: string
    providerAccountId: string
    access_token?: string
    expires_at?: number
    refresh_token?: string
    id_token?: string
    oauth_token?: string
    oauth_token_secret?: string
    state?: {
      clinicId?: string
    }
  }
}
