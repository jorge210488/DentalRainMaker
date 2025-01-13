'use client'

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import HomeView from '@/views/HomeView/Home'

const Home: React.FC = () => {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      console.log('Token:', session?.user?.token)
      console.log('User ID:', session?.user?.userId)
      console.log('User Type:', session?.user?.type)
      console.log('User views', session?.user?.views)
    } else if (status === 'unauthenticated') {
      console.log('No session available')
    }
  }, [status, session])

  return (
    <>
      <HomeView />
      <div>Welcome, {session?.user?.name || 'Guest'}</div>
    </>
  )
}

export default Home
