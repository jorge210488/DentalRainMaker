import type { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
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

          if (!response.ok) {
            throw new Error('Invalid credentials')
          }

          const data = await response.json()

          // Retornar los datos necesarios
          return {
            id: data.userId,
            id_token: data.token,
            user_id: data.userId,
            user_type: data.type,
            user_views: data.views,
          }
        } catch (error) {
          console.error('Error during local login:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && profile) {
        const userPayload = {
          name: profile.name,
          given_name: profile.given_name,
          family_name: profile.family_name,
          email: profile.email,
          provider: 'google',
          providerId: account.providerAccountId,
          type: 'PATIENT', // Default type
        }

        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userPayload),
          })

          console.log('User registered successfully')
        } catch (err) {
          console.error('User already registered or registration failed')
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

          account.id_token = data.token
          account.user_id = data.userId
          account.user_type = data.type
          account.user_views = data.views

          console.log('User signed in successfully', data)
        } catch (error) {
          console.error('Sign-in failed or Firebase token save failed')
          return false // Prevent sign-in
        }
      }
      return true // Allow sign-in
    },

    async jwt({ token, account, profile, user }) {
      if (account && account.provider === 'credentials') {
        // Datos de credentials
        token.accessToken = user?.id_token // Consistencia con GoogleProvider
        token.userId = user?.user_id
        token.type = user?.user_type
        token.views = user?.user_views
      }

      if (account && account.provider === 'google') {
        // Datos de GoogleProvider
        token.accessToken = account.id_token
        token.userId = account.user_id
        token.type = account.user_type
        token.views = account.user_views
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
      }

      return session
    },
    async redirect({ url, baseUrl }) {
      return '/dashboard/patient'
    },
  },
}
