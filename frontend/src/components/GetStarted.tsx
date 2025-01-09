'use client'
import { useRouter } from 'next/navigation'

const GetStarted: React.FC = () => {
  const router = useRouter()

  const handleGetStartedClick = () => {
    router.push('/getstarted')
  }

  return (
    <>
      <section className='bg-white px-8 py-16'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='text-3xl font-bold text-gray-800'>
            Ready to grow your practice?
          </h2>
          <button
            onClick={handleGetStartedClick}
            className='mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700'
          >
            Get started
          </button>
        </div>
      </section>
    </>
  )
}

export default GetStarted
