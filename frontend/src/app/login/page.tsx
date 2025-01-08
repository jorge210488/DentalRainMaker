import NavbarHome from '@/components/NavbarHome'
import React from 'react'

const Login: React.FC = () => {
  return (
    <>
      <main className='min-h-screen bg-gray-50'>
        {/* Navbar */}
        <NavbarHome />

        <h1 className='text-black'>Login</h1>
      </main>
    </>
  )
}

export default Login
