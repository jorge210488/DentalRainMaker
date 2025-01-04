import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid email profile',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.given_name = profile.given_name
        token.family_name = profile.family_name
        token.email = profile.email
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.sub
      session.user.given_name = token.given_name
      session.user.family_name = token.family_name
      session.user.email = token.email
      return session
    },
  },
})

export { handler as GET, handler as POST }
