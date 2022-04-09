/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, { AxiosRequestConfig } from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000',
})

API.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem('token') || ''
  //@ts-ignore
  request.headers['Authorization'] = `Bearer ${token}`
  return request
})

export default API
