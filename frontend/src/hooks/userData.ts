import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/slices/userSlice'
import { fetchContactById } from '@/server/contacts'
import { useSession } from 'next-auth/react'

export const useLoadUserProfile = () => {
  const dispatch = useDispatch()
  const { data: session, status } = useSession()

  useEffect(() => {
    // Logs basados en el estado de la sesión
    console.log('Session status:', status)
    if (status === 'authenticated') {
      console.log('Session is authenticated')
      console.log('Token:', session?.user?.token)
      console.log('User ID:', session?.user?.userId)
      console.log('User Type:', session?.user?.type)
      console.log('User Views:', session?.user?.views)

      const loadUserProfile = async () => {
        try {
          if (
            session?.user?.token &&
            session?.user?.userId &&
            session?.user?.clinicId
          ) {
            console.log('Fetching user data...')
            const userData = await fetchContactById(
              session.user.clinicId,
              session.user.userId,
              session.user.token,
            )
            console.log('Fetched user data:', userData)
            dispatch(setUser(userData))
          } else {
            console.warn('Required session data is missing')
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error)
        }
      }

      loadUserProfile()
    } else if (status === 'unauthenticated') {
      console.log('No session available')
    } else if (status === 'loading') {
      console.log('Session is loading')
    }
  }, [dispatch, session, status])
}
