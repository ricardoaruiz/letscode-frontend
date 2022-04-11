import React from 'react'

import {
  LogInCircle,
  User,
  Exit,
  Task,
  ArrowBack,
} from '@styled-icons/boxicons-regular'
import { useAuth } from '../../contexts/AuthContext'
import { HeaderProps } from './types'
import { ActionButton } from '../ActionButton'
import { Modal } from '../Modal'

import * as S from './styles'

export const Header: React.VFC<HeaderProps> = ({ onNewCard }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [showModalLogin, setShowModalLogin] = React.useState(false)
  const { login, logout, isLogged } = useAuth()

  const userRef = React.useRef<HTMLInputElement | null>(null)
  const passwordRef = React.useRef<HTMLInputElement | null>(null)

  const handleSubmitFormLogin = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      try {
        setShowModalLogin(false)
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
          <div>
            {!isLoading && (
              <>
                <S.Mobile>
                  <ActionButton
                    type="button"
                    aria-label="Login button"
                    light
                    onClick={() => setShowModalLogin(true)}
                  >
                    <LogInCircle size={24} />
                  </ActionButton>
                </S.Mobile>

                <S.Desktop>
                  <S.FormLoginDesktop onSubmit={handleSubmitFormLogin}>
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
                  </S.FormLoginDesktop>
                </S.Desktop>
              </>
            )}
            {isLoading && <S.LoginLoader size={24} />}
          </div>
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

      {/* Mobile Login */}
      <Modal isOpen={showModalLogin}>
        <S.ModalContent>
          <S.FormLoginMobile onSubmit={handleSubmitFormLogin}>
            <S.FormLoginMobileTitle>Login</S.FormLoginMobileTitle>

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

            <S.FormLoginActions>
              <ActionButton
                type="button"
                aria-label="Cancel login"
                light
                onClick={() => setShowModalLogin(false)}
              >
                <ArrowBack size={24} />
              </ActionButton>
              <ActionButton
                type="submit"
                aria-label="Login mobile button"
                light
              >
                <LogInCircle size={24} />
              </ActionButton>
            </S.FormLoginActions>
          </S.FormLoginMobile>
        </S.ModalContent>
      </Modal>
    </S.Wrapper>
  )
}
