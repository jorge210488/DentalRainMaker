'use client'

import React from 'react'
import { useMediaQuery } from '@mui/material'

export const LookerStudioEmbed: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return (
    <div className='relative mt-8 h-[600px] w-full overflow-hidden rounded-lg'>
      {!isMobile ? (
        <iframe
          src='https://lookerstudio.google.com/embed/reporting/52a9d05c-873b-4cb5-96d2-9342fd9071a7/page/tEnnC'
          title='Looker Studio Dashboard'
          className='absolute left-0 top-0 border-0'
          style={{
            width: '125%',
            height: '125%',
            transform: 'scale(0.8)',
            transformOrigin: 'top left',
          }}
          allowFullScreen
          sandbox='allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox'
        ></iframe>
      ) : (
        <iframe
          src='https://lookerstudio.google.com/embed/reporting/6898abc7-1131-461c-8b75-c0853294167f/page/tEnnC'
          className='absolute left-[-77%] top-0 border-0'
          style={{
            width: '65%',
            height: '125%',
            transform: 'scale(4)',
            transformOrigin: 'top left',
          }}
          allowFullScreen
          sandbox='allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox'
        ></iframe>
      )}
    </div>
  )
}

export default LookerStudioEmbed
