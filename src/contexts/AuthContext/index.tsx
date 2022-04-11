import React from 'react'
import { useLogin, useLocalStorage } from '../../services'
import { AuthContextValue, AuthProviderProps } from './types'
import { Credentials } from '../../services/useLogin/types'

const AuthContext = React.createContext({} as AuthContextValue)
AuthContext.displayName = 'AuthContext'

const TOKEN = 'token'

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  reset,
}) => {
  const { login: doLoggin } = useLogin()
  const { getItem, setItem, removeItem } = useLocalStorage()

  const [isLogged, setIsLogged] = React.useState(false)
  const [isSessionExpired, setIsSessionExpired] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  const login = React.useCallback(
    async (credentials: Credentials) => {
      try {
        const token = await doLoggin(credentials)

        setIsLogged(true)
        setItem(TOKEN, token)
      } catch (error: any) {
        setErrorMessage(error.message)
        throw error
      }
    },
    [doLoggin, setItem]
  )

  const logout = React.useCallback(() => {
    removeItem(TOKEN)
    setIsLogged(false)
  }, [removeItem])

  const cleanErrorMessage = React.useCallback(() => {
    setErrorMessage('')
  }, [])

  React.useEffect(() => {
    setIsLogged(!!getItem(TOKEN))
  }, [getItem])

  React.useEffect(() => {
    if (reset) {
      setIsLogged(false)
      setIsSessionExpired(false)
    }
  }, [reset])

  const contextValue = {
    isLogged,
    login,
    logout,
    isSessionExpired,
    setIsSessionExpired,
    errorMessage,
    cleanErrorMessage,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used under AuthContextProvider')
  }

  return context
}
