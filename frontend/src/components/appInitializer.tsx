'use client'

import React, { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchClinics } from '@/server/clinicsApi'
import { setClinics } from '@/redux/slices/clinicsSlice'

interface AppInitializerProps {
  children: ReactNode
}

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const initializeClinics = async () => {
      try {
        const clinics = await fetchClinics()
        dispatch(setClinics(clinics))
        console.log('Clinics fetched and saved in Redux:', clinics)

      } catch (error) {
        console.error('Error initializing clinics:', error)
      }
    }

    initializeClinics()
  }, [dispatch])

  return <>{children}</>
}

export default AppInitializer
