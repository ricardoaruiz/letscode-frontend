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
      const response = await api.post('/login', credentials)

      if (!response.data) {
        throw new Error('Invalid credentials')
      }

      return response.data
    },
    [api]
  )

  return { login }
}
