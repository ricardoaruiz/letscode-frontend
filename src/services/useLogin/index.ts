import React from 'react'
import { useApi } from '../useApi'

import { Credentials, UseLogin } from './types'

export const useLogin = (): UseLogin => {
  const api = useApi()
  /**
   * Perform a system login and get a token
   * @param credentials
   */
  const login = React.useCallback(
    async (credentials: Credentials) => {
      try {
        const response = await api.post('/login', credentials)
        return response.data
      } catch (error) {
        // TODO handle errors
        console.error('Error on login', error)
      }
    },
    [api]
  )

  return { login }
}
