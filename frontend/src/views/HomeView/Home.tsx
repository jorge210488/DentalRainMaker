import GetStarted from '@/components/HomeComponents/GetStarted'
import NavbarHome from '@/components/HomeComponents/NavbarHome'
import Presentation from '@/components/HomeComponents/Presentation'
import React from 'react'

const HomeView: React.FC = () => {
  return (
    <main className='min-h-screen bg-gray-50'>
      {/* Navbar */}
      {/* <NavbarHome /> */}

      {/* Presentation */}
      <Presentation />

      {/* Get Started */}
      <GetStarted />
    </main>
  )
}

export default HomeView
