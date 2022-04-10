import { rest } from 'msw'
import { LOGIN_SUCCESS, LOAD_CARD_SUCCESS } from './resolvers'

const LOCAL_BASE_URL = 'http://localhost:5000'

export const handlers = [
  rest.post(`${LOCAL_BASE_URL}/login`, LOGIN_SUCCESS),
  rest.get(`${LOCAL_BASE_URL}/cards`, LOAD_CARD_SUCCESS),
]
