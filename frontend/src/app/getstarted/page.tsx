import NavbarHome from '@/components/NavbarHome'
import React from 'react'

const GetStarted: React.FC = () => {
  return (
    <>
      <main className='min-h-screen bg-gray-50'>
        {/* Navbar */}
        <NavbarHome />

        <h1 className='text-black'>GetStarted</h1>
      </main>
    </>
  )
}

export default GetStarted
