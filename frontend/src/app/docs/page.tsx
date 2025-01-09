import NavbarHome from '@/components/NavbarHome'
import React from 'react'

const Docs: React.FC = () => {
  return (
    <>
      <main className='min-h-screen bg-gray-50'>
        {/* Navbar */}
        <NavbarHome />

        <h1 className='text-black'>Docs</h1>
      </main>
    </>
  )
}

export default Docs
