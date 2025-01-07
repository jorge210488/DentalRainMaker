'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function HomePage() {
  const { data: session } = useSession()

  return (
    <main className='flex h-screen flex-col items-center justify-center bg-gray-50'>
      <h1 className='mb-6 text-4xl font-bold text-blue-600'>
        Welcome to the Home Page!
      </h1>
      {!session ? (
        <button
          onClick={() => signIn('google')}
          className='rounded-md bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700'
        >
          Sign in with Google
        </button>
      ) : (
        <div className='text-center'>
          <p className='mb-4'>Hello, {session.user?.given_name}</p>
          <button
            onClick={() => signOut()}
            className='rounded-md bg-red-600 px-6 py-2 text-white transition hover:bg-red-700'
          >
            Sign Out
          </button>
        </div>
      )}
    </main>
  )
}
