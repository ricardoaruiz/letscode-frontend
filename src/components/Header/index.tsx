import React from 'react'

import { LogInCircle, User, Exit, Task } from '@styled-icons/boxicons-regular'
import { useAuth } from '../../contexts/AuthContext'
import { HeaderProps } from './types'
import { ActionButton } from '../ActionButton'

import * as S from './styles'

export const Header: React.VFC<HeaderProps> = ({ onNewCard }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { login, logout, isLogged } = useAuth()

  const userRef = React.useRef<HTMLInputElement | null>(null)
  const passwordRef = React.useRef<HTMLInputElement | null>(null)

  const handleSubmitFormLogin = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      try {
        setIsLoading(true)

        event.preventDefault()
        const user = userRef.current?.value
        const password = passwordRef.current?.value

        if (user && password) {
          await login({ login: user, senha: password })
        }
      } catch (error) {
        // TODO handle erros
        console.error('Header.handleSubmitFormLogin', error)
      } finally {
        setIsLoading(false)
      }
    },
    [login]
  )

  return (
    <S.Wrapper>
      <S.Logo aria-label="Logo Let's code">LET&#39;S CODE</S.Logo>
      <S.Actions>
        {!isLogged && (
          <form onSubmit={handleSubmitFormLogin}>
            {!isLoading && (
              <>
                <S.Input
                  type="text"
                  placeholder="User"
                  ref={userRef}
                  defaultValue="letscode"
                />
                <S.Input
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                  defaultValue="lets@123"
                />

                <ActionButton type="submit" aria-label="Login button" light>
                  <LogInCircle size={24} />
                </ActionButton>
              </>
            )}
            {isLoading && <S.LoginLoader size={24} />}
          </form>
        )}
        {isLogged && (
          <>
            <ActionButton
              aria-label="new task"
              onClick={onNewCard}
              title="Create new task"
              light
            >
              <Task size={24} />
            </ActionButton>
            <ActionButton
              aria-label="user information"
              title="User information"
              light
            >
              <User size={24} />
            </ActionButton>
            <ActionButton
              aria-label="logout"
              onClick={logout}
              title="Logout"
              light
            >
              <Exit size={24} />
            </ActionButton>
          </>
        )}
      </S.Actions>
    </S.Wrapper>
  )
}
