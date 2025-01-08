'use client'
import { useRouter } from 'next/navigation'

const NavbarHome: React.FC = () => {
  const router = useRouter()

  const handleHomeClick = () => {
    router.push('/home')
  }

  const handleFeaturesClick = () => {
    router.push('/features')
  }

  const handlePricingClick = () => {
    router.push('/pricing')
  }

  const handleDocsClick = () => {
    router.push('/docs')
  }

  const handleLoginClick = () => {
    router.push('/login')
  }

  return (
    <>
      <header className='sticky top-0 z-50 flex items-center justify-between bg-white px-8 py-4 shadow'>
        {/* Logo */}
        <div className='text-lg font-semibold text-black'>
          Dental Rain Maker
        </div>

        {/* Navegación y Botón Log in */}
        <div className='flex items-center space-x-6'>
          <nav className='flex space-x-6'>
            <button
              onClick={handleHomeClick}
              className='text-gray-600 hover:text-gray-800'
            >
              Home
            </button>
            <button
              onClick={handleFeaturesClick}
              className='text-gray-600 hover:text-gray-800'
            >
              Features
            </button>
            <button
              onClick={handlePricingClick}
              className='text-gray-600 hover:text-gray-800'
            >
              Pricing
            </button>
            <button
              onClick={handleDocsClick}
              className='text-gray-600 hover:text-gray-800'
            >
              Docs
            </button>
          </nav>

          <button
            onClick={handleLoginClick}
            className='rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
          >
            Log in
          </button>
        </div>
      </header>
    </>
  )
}

export default NavbarHome
