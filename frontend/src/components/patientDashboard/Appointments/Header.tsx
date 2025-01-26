'use client'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()

  return (
    <header className='mb-6 flex items-center justify-between'>
      <h1 className='text-2xl font-bold'>My Appointments</h1>
      <button
        onClick={() => router.push('/patientDashboard/scheduled-appointment')}
        className='rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600'
      >
        + Schedule Appointment
      </button>
    </header>
  )
}

export default Header
