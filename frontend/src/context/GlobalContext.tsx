'use client'

import { useUserCookies } from '@/hooks/useUserCookies'
import { IAuthContext } from '@/interfaces/GlobalContextInterface'
import { IUserLogin } from '@/interfaces/RequestInterfaces'
import React, { createContext, ReactNode, useEffect, useState } from 'react'

export const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  setCurrentUser: () => {},
  userIdGoogle: null,
  setUserIdGoogle: () => {},
  token: null,
  setToken: () => {},
})

const GlobalContext = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<IUserLogin | null>(null)
  const [userIdGoogle, setUserIdGoogle] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const {
    getGoogleUser,
    getRegularUser,
    getUserToken,
    saveUserToken,
    isValidToken,
  } = useUserCookies()

  const syncUserWithCookies = async () => {
    const userGoogle = await getGoogleUser()

    if (userGoogle) {
      setCurrentUser(userGoogle)
    } else {
      const regularUser = await getRegularUser()
      if (regularUser) {
        setCurrentUser(regularUser)
      }
    }
  }

  const syncTokenCookies = async () => {
    const token = await getUserToken()
    if (token && isValidToken(token)) {
      setToken(token)
    }
  }

  useEffect(() => {
    syncUserWithCookies()
    syncTokenCookies()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userIdGoogle,
        setUserIdGoogle,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default GlobalContext
