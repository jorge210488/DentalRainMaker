import { IUserLogin } from './RequestInterfaces'

export interface IAuthContext {
  currentUser: IUserLogin | null
  setCurrentUser: (currentUser: IUserLogin | null) => void
  userIdGoogle: string | null
  setUserIdGoogle: (userIdGoogle: string | null) => void
  token: string | null
  setToken: (token: string | null) => void
}
