import React from 'react'
import API from '../api-config'

import { Credentials, UseLogin } from './types'

export const useLogin = (): UseLogin => {
  /**
   * Perform a system login and get a token
   * @param credentials
   */
  const login = React.useCallback(async (credentials: Credentials) => {
    try {
      const response = await API.post('/login', credentials)
      return response.data
    } catch (error) {
      // TODO handle errors
      console.error('Error on login', error)
    }
  }, [])

  return { login }
}
