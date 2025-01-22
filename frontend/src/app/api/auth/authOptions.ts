import type { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import jwt from 'jsonwebtoken'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
                provider: 'local',
              }),
            },
          )

          // console.log('Authorize Response:', response)

          if (!response.ok) {
            throw new Error('Invalid credentials')
          }

          const data = await response.json()
          // console.log('Authorize Data:', data)

          const decodedToken = jwt.decode(data.token) as jwt.JwtPayload | null
          // console.log('Decoded Token:', decodedToken)

          if (!decodedToken || typeof decodedToken !== 'object') {
            throw new Error(
              'Failed to decode token or token is not a valid object',
            )
          }

          // console.log('Decoded Token:', decodedToken)

          // Retornar los datos necesarios
          return {
            id: decodedToken.userId,
            id_token: data.token,
            user_id: decodedToken.user_id,
            user_type: decodedToken.type,
            user_views: decodedToken.views,
            user_clinicId: decodedToken.clinic_id,
          }
        } catch (error) {
          console.error('Error during local login:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account && profile) {
        const userPayload = {
          name: profile.name,
          given_name: profile.given_name,
          family_name: profile.family_name,
          email: profile.email,
          provider: 'google',
          providerId: account.providerAccountId,
          type: 'PATIENT', // Default type
          clinic_id: 'fb8ce23f-8fed-4911-8fdf-ed4a5c9dd306',
        }

        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userPayload),
          })

          // console.log('User registered successfully')
        } catch (err) {
          console.error('User already registered or registration failed', err)
        }

        try {
          const loginPayload = {
            email: profile.email,
            provider: 'google',
            providerId: account.providerAccountId,
          }

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(loginPayload),
            },
          )

          if (!response.ok) {
            throw new Error('Failed to sign in user')
          }

          const data = await response.json()
          // Decodificar el token
          const decodedToken = jwt.decode(data.token) as jwt.JwtPayload | null

          if (!decodedToken || typeof decodedToken !== 'object') {
            throw new Error(
              'Failed to decode token or token is not a valid object',
            )
          }

          // console.log('Decoded Token:', decodedToken)

          account.id_token = data.token
          account.user_id = decodedToken.user_id
          account.user_type = decodedToken.type
          account.user_views = decodedToken.views
          account.user_clinicId = decodedToken.clinic_id

          // console.log('User signed in successfully', decodedToken)
        } catch (error) {
          console.error('Sign-in failed or Firebase token save failed', error)
          return false // Prevent sign-in
        }
      }
      return true // Allow sign-in
    },

    async jwt({ token, account, profile, user }) {
      // console.log('JWT Callback - Initial Token:', token)
      // console.log('JWT Callback - Account:', account)
      // console.log('JWT Callback - User:', user)

      if (account && account.provider === 'credentials' && user) {
        // Datos de credentials
        token.accessToken = user?.id_token // Consistencia con GoogleProvider
        token.userId = user?.user_id
        token.type = user?.user_type
        token.views = user?.user_views
        token.clinicId = user?.user_clinicId
      }

      if (account && account.provider === 'google') {
        // Datos de GoogleProvider
        token.accessToken = account.id_token
        token.userId = account.user_id
        token.type = account.user_type
        token.views = account.user_views
        token.clinicId = account.user_clinicId
      }

      if (profile) {
        token.given_name = profile.given_name
        token.family_name = profile.family_name
        token.email = profile.email
        token.name = profile.name
        token.provider = 'google'
      }
      return token
    },
    async session({ session, token }) {
      // console.log('Session Callback - Token:', token)
      // console.log('Session Callback - Initial Session:', session)
      if (session.user) {
        session.user.id = token.id as string
        session.user.given_name = token.given_name as string
        session.user.family_name = token.family_name as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.provider = token.provider as string

        session.user.token = token.accessToken as string
        session.user.userId = token.userId as string
        session.user.type = token.type as string
        session.user.views = token.views as string[]
        session.user.clinicId = token.clinicId as string
      }

      return session
    },
    async redirect({ url, baseUrl }) {
      // Si viene de iniciar sesión, redirige al dashboard
      if (url === '/patientDashboard') {
        return '/patientDashboard'
      }

      // Si viene de cerrar sesión, redirige al login
      if (url === '/login') {
        return '/login'
      }

      // Permite redirecciones dentro del dominio base
      if (url.startsWith(baseUrl)) {
        return url
      }

      // Redirección predeterminada para otros casos
      return '/patientDashboard'
    },
  },
}
