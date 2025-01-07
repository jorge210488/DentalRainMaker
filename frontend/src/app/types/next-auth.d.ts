import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Profile {
    given_name?: string
    family_name?: string
    email?: string
    name?: string
    picture?: string
  }

  interface Session {
    user: {
      id: string
      given_name?: string
      family_name?: string
      email: string
      name: string
      provider: string
    }
  }

  interface JWT {
    id: string
    given_name?: string
    family_name?: string
    email: string
    name: string
    provider: string
  }
}
