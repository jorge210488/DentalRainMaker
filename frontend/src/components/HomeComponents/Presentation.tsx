import Image from 'next/image'

const Presentation: React.FC = () => {
  return (
    <>
      {/* Presentation */}
      <section className='relative bg-white px-8 py-16'>
        {/* Imagen de fondo */}
        <div className='relative mx-auto h-[500px] max-w-6xl overflow-hidden rounded-lg'>
          <Image
            src='http://res.cloudinary.com/deflfnoba/image/upload/v1736289380/DentalRainMaker%20Frontend/k2nwndt0vl6gk6mk1lrv.jpg'
            alt='Dental Consultory'
            fill
            className='object-cover'
          />
          {/* Texto superpuesto */}
          <div className='absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 to-transparent px-8 py-8 text-center text-white'>
            <h1 className='text-4xl font-bold text-white'>
              AI-powered dental practice management
            </h1>
            <p className='mt-4 max-w-2xl text-white'>
              Empower your practice with the Dental Rain Maker AI platform and
              mobile app. From a central data platform, analytics tools,
              automated workflows, and compliance with HIPAA/GDPR standards,
              you’ll be able to enhance patient care, operational efficiency,
              and increase profitability.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className='bg-gray-50 px-8 py-16'>
        <div className='mx-auto max-w-6xl text-center'>
          <h2 className='text-3xl font-bold text-gray-800'>How it works</h2>
          <p className='mt-4 text-gray-600'>
            We provide an end-to-end solution that enables you to manage your
            practice more efficiently and effectively. With a central data
            platform, a mobile app, and analytics tools, we help you streamline
            your operations, improve patient care, and increase profitability.
          </p>
          <div className='mt-12 grid grid-cols-1 gap-8 md:grid-cols-4'>
            <div className='rounded-lg bg-white p-6 text-center shadow'>
              <div className='w-25 relative mx-auto h-20'>
                <Image
                  src='https://res.cloudinary.com/deflfnoba/image/upload/v1736293002/DentalRainMaker%20Frontend/lbbiqoqyine0qag46u9x.jpg'
                  alt='Central data platform'
                  fill
                  className='object-contain'
                />
              </div>

              <h3 className='mt-4 text-lg font-semibold text-gray-800'>
                Central data platform
              </h3>
              <p className='mt-2 text-gray-600'>
                Aggregate your data into a central platform for easy access and
                analysis.
              </p>
            </div>
            <div className='rounded-lg bg-white p-6 text-center shadow'>
              <div className='w-25 relative mx-auto h-20'>
                <Image
                  src='http://res.cloudinary.com/deflfnoba/image/upload/v1736294465/DentalRainMaker%20Frontend/h2uyu0jzilc6wtcfb0p3.jpg'
                  alt='Mobile app'
                  fill
                  className='object-contain'
                />
              </div>
              <h3 className='mt-4 text-lg font-semibold text-gray-800'>
                Mobile app
              </h3>
              <p className='mt-2 text-gray-600'>
                Access your data and insights on the go with our mobile app.
              </p>
            </div>
            <div className='rounded-lg bg-white p-6 text-center shadow'>
              <div className='w-25 relative mx-auto h-20'>
                <Image
                  src='https://res.cloudinary.com/deflfnoba/image/upload/v1736294528/DentalRainMaker%20Frontend/als7zzyikedc7pxtrdgb.jpg'
                  alt='Workflows'
                  fill
                  className='object-contain'
                />
              </div>
              <h3 className='mt-4 text-lg font-semibold text-gray-800'>
                Automated workflows
              </h3>
              <p className='mt-2 text-gray-600'>
                Automate repetitive tasks to save time and improve accuracy.
              </p>
            </div>
            <div className='rounded-lg bg-white p-6 text-center shadow'>
              <div className='w-25 relative mx-auto h-20'>
                <Image
                  src='http://res.cloudinary.com/deflfnoba/image/upload/v1736294578/DentalRainMaker%20Frontend/r8j8irf3u9nn9uouqcu0.jpg'
                  alt='Patient care'
                  fill
                  className='object-contain'
                />
              </div>
              <h3 className='mt-4 text-lg font-semibold text-gray-800'>
                Patient care insights
              </h3>
              <p className='mt-2 text-gray-600'>
                Leverage AI to gain insights into patient care and practice
                performance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Presentation
