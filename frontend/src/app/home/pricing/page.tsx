import NavbarHome from '@/components/HomeComponents/NavbarHome'
import React from 'react'

const Pricing: React.FC = () => {
  return (
    <>
      <main className='min-h-screen bg-gray-50'>
        {/* Navbar */}
        <NavbarHome />

        <h1 className='text-black'>Pricing</h1>
      </main>
    </>
  )
}

export default Pricing
