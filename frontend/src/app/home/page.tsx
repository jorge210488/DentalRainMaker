'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'


export default function HomePage() {
  const { data: session } = useSession()

  return (
    <main className='min-h-screen bg-gray-50'>
      {/* <h1 className='mb-6 text-4xl font-bold text-blue-600'>
        Welcome to the Home Page!
      </h1>
      {!session ? (
        <button
          onClick={() => signIn('google')}
          className='rounded-md bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700'
        >
          Sign in with Google
        </button>
      ) : (
        <div className='text-center'>
          <p className='mb-4'>Hello, {session.user?.given_name}</p>
          <button
            onClick={() => signOut()}
            className='rounded-md bg-red-600 px-6 py-2 text-white transition hover:bg-red-700'
          >
            Sign Out
          </button>
        </div>
      )} */}

      {/* Navbar */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-white shadow">
        {/* Logo */}
        <div className="text-lg text-black font-semibold">Dental Rain Maker</div>
        
        {/* Navegación y Botón Log in */}
        <div className="flex items-center space-x-6">
          <nav className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Features
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Pricing
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Docs
            </a>
          </nav>
          <a
            href="#"
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Log in
          </a>
        </div>
      </header>

      {/* Intro Section */}
      <section className="relative px-8 py-16 bg-white">
        {/* Imagen de fondo */}
        <div className="relative h-[500px] max-w-6xl mx-auto overflow-hidden rounded-lg">
          <Image
            src="http://res.cloudinary.com/deflfnoba/image/upload/v1736289380/DentalRainMaker%20Frontend/k2nwndt0vl6gk6mk1lrv.jpg"
            alt="Dental Consultory"
            fill
            className="object-cover"
          />
          {/* Texto superpuesto */}
          <div className=" absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 to-transparent text-white px-8 py-8 text-center">
            <h1 className="text-4xl font-bold text-white">
              AI-powered dental practice management
            </h1>
            <p className="mt-4 max-w-2xl text-white">
              Empower your practice with the Dental Rain Maker AI platform and
              mobile app. From a central data platform, analytics tools,
              automated workflows, and compliance with HIPAA/GDPR standards,
              you’ll be able to enhance patient care, operational efficiency, and
              increase profitability.
            </p>
          </div>

        </div>
        
      </section>

      {/* How it Works */}
      <section className="px-8 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">How it works</h2>
          <p className="mt-4 text-gray-600">
            We provide an end-to-end solution that enables you to manage your
            practice more efficiently and effectively. With a central data
            platform, a mobile app, and analytics tools, we help you streamline
            your operations, improve patient care, and increase profitability.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <div className='relative h-20 w-25 mx-auto'>
                <Image
                  src="https://res.cloudinary.com/deflfnoba/image/upload/v1736293002/DentalRainMaker%20Frontend/lbbiqoqyine0qag46u9x.jpg"
                  alt="Central data platform"
                  fill
                  className="object-contain"
                />
              </div>
              
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                Central data platform
              </h3>
              <p className="mt-2 text-gray-600">
                Aggregate your data into a central platform for easy access and
                analysis.
              </p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <div className='relative h-20 w-25 mx-auto'>
                <Image
                  src="http://res.cloudinary.com/deflfnoba/image/upload/v1736294465/DentalRainMaker%20Frontend/h2uyu0jzilc6wtcfb0p3.jpg"
                  alt="Mobile app"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                Mobile app
              </h3>
              <p className="mt-2 text-gray-600">
                Access your data and insights on the go with our mobile app.
              </p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <div className='relative h-20 w-25 mx-auto'>
                <Image
                  src="https://res.cloudinary.com/deflfnoba/image/upload/v1736294528/DentalRainMaker%20Frontend/als7zzyikedc7pxtrdgb.jpg"
                  alt="Workflows"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                Automated workflows
              </h3>
              <p className="mt-2 text-gray-600">
                Automate repetitive tasks to save time and improve accuracy.
              </p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <div className='relative h-20 w-25 mx-auto'>
                <Image
                  src="http://res.cloudinary.com/deflfnoba/image/upload/v1736294578/DentalRainMaker%20Frontend/r8j8irf3u9nn9uouqcu0.jpg"
                  alt="Patient care"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                Patient care insights
              </h3>
              <p className="mt-2 text-gray-600">
                Leverage AI to gain insights into patient care and practice
                performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-8 py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Ready to grow your practice?
          </h2>
          <a
            href="#"
            className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Get started
          </a>
        </div>
      </section>
    </main>
  )
}
