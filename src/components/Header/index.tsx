import React from 'react'
import { LogInCircle, User, Exit } from '@styled-icons/boxicons-regular'
import { useAuth } from '../../contexts/AuthContext'

import * as S from './styles'

export const Header: React.VFC = () => {
  const { login, logout, isLogged } = useAuth()

  const userRef = React.useRef<HTMLInputElement | null>(null)
  const passwordRef = React.useRef<HTMLInputElement | null>(null)

  const handleSubmitFormLogin = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const user = userRef.current?.value
      const password = passwordRef.current?.value

      if (user && password) {
        login({ login: user, senha: password })
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

            <S.ActionButton type="submit" aria-label="Login button">
              <LogInCircle size={24} />
            </S.ActionButton>
          </form>
        )}
        {isLogged && (
          <>
            <S.ActionButton>
              <User size={24} />
            </S.ActionButton>
            <S.ActionButton onClick={logout}>
              <Exit size={24} />
            </S.ActionButton>
          </>
        )}
      </S.Actions>
    </S.Wrapper>
  )
}
