import { signIn, signOut, useSession } from 'next-auth/react'

export default function Login() {
  const { data: session } = useSession()

  return (
    <div>
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
    </div>
  )
}
