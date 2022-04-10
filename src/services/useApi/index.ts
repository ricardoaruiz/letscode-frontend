/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import jwt_decode from 'jwt-decode'

import { useAuth } from '../../contexts/AuthContext'
import { useLocalStorage } from '../useLocalStorage'
import { Token } from './types'

export const useApi = () => {
  const { setIsSessionExpired } = useAuth()
  const { getItem } = useLocalStorage()

  const baseURL = 'http://localhost:5000'
  // const baseURL = 'https://letscode-api.herokuapp.com'
  const API = axios.create({ baseURL })

  API.interceptors.request.use((request: AxiosRequestConfig) => {
    const token = getItem('token') || ''

    if (request.url !== '/login') {
      if (!token) {
        setIsSessionExpired(true)
        throw new Error('Expired Session')
      }
      if (token) {
        const decodedToken = jwt_decode(token) as Token
        const currentDate = new Date()

        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          setIsSessionExpired(true)
          throw new Error('Expired Session')
        }
      }
    }
    //@ts-ignore
    request.headers['Authorization'] = `Bearer ${token}`
    return request
  })

  API.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        setIsSessionExpired(true)
      }
      throw error
    }
  )

  return React.useMemo(() => {
    return API
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
