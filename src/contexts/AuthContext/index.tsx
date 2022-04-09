import React from 'react'
import { useLogin, useLocalStorage } from '../../services'
import { AuthContextValue, AuthProviderProps } from './types'
import { Credentials } from '../../services/useLogin/types'

const AuthContext = React.createContext({} as AuthContextValue)
AuthContext.displayName = 'AuthContext'

const TOKEN = 'token'

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { login: doLoggin } = useLogin()
  const { getItem, setItem, removeItem } = useLocalStorage()

  const [isLogged, setIsLogged] = React.useState(false)

  const login = React.useCallback(
    async (credentials: Credentials) => {
      const token = await doLoggin(credentials)
      setIsLogged(true)
      setItem(TOKEN, token)
    },
    [doLoggin, setItem]
  )

  const logout = React.useCallback(() => {
    removeItem(TOKEN)
    setIsLogged(false)
  }, [removeItem])

  React.useEffect(() => {
    setIsLogged(!!getItem(TOKEN))
  }, [getItem])

  const contextValue = {
    isLogged,
    login,
    logout,
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
