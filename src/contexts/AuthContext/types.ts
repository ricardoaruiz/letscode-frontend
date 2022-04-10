import { Credentials } from 'services/useLogin/types'

export type AuthProviderProps = {
  children: React.ReactNode
}

export type AuthContextValue = {
  isLogged: boolean
  login: (credentials: Credentials) => void
  logout: () => void
  isSessionExpired: boolean
  setIsSessionExpired: React.Dispatch<React.SetStateAction<boolean>>
}
