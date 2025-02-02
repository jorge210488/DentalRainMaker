'use client'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()

  return (
    <header className='mb-4 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between lg:w-[90%]'>
      <h1 className='text-xl font-bold sm:text-2xl'>My Appointments</h1>
      <button
        onClick={() =>
          router.push('/pages/patientDashboard/scheduled-appointment')
        }
        className='flex w-full items-center justify-center gap-2 rounded-lg bg-black px-3 py-2 text-sm text-white transition-colors hover:bg-purple-600 sm:w-auto sm:px-4 sm:text-base'
      >
        <span className='inline-block'>+</span>
        <span>Schedule Appointment</span>
      </button>
    </header>
  )
}
export default Header
