// front/src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { getFirebaseToken } from '@/utils/firebase'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
          // Attempt to register the user
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
          // Attempt to sign in the user
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

          // Obtener el token de Firebase y enviarlo al backend
          const firebaseToken = await getFirebaseToken()
          if (firebaseToken) {
            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/notifications/save`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userId: data.user.id,
                  token: firebaseToken,
                }),
              },
            )
            console.log('Firebase token saved successfully')
          }
          console.log('User signed in successfully', data)
        } catch (error) {
          console.error('Sign-in failed or Firebase token save failed')
          return false // Prevent sign-in
        }
      }
      return true // Allow sign-in
    },
    async redirect({ url, baseUrl }) {
      return '/home'
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = account.providerAccountId // Google User ID
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
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
