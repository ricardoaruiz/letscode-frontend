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
  const [isCredentialsMissing, setIsCredentialsMissing] = React.useState(false)
  const { login, logout, isLogged, errorMessage, cleanErrorMessage } = useAuth()

  const formRef = React.useRef<HTMLFormElement | null>(null)
  const userRef = React.useRef<HTMLInputElement | null>(null)
  const passwordRef = React.useRef<HTMLInputElement | null>(null)

  const formRefDesk = React.useRef<HTMLFormElement | null>(null)
  const userRefDesk = React.useRef<HTMLInputElement | null>(null)
  const passwordRefDesk = React.useRef<HTMLInputElement | null>(null)

  const okErrorModalButtonRef = React.useRef<HTMLButtonElement | null>(null)

  const handleSubmitFormLogin = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const user = userRef.current?.value || userRefDesk.current?.value
      const password =
        passwordRef.current?.value || passwordRefDesk.current?.value

      if (!user || !password) {
        setIsCredentialsMissing(true)
        return
      }

      try {
        setIsLoading(true)
        await login({ login: user, senha: password })
        setShowModalLogin(false)
        formRef.current?.reset()
        formRefDesk.current?.reset()
      } finally {
        setIsLoading(false)
      }
    },
    [login]
  )

  React.useEffect(() => {
    if (!!errorMessage || isCredentialsMissing) {
      setTimeout(() => {
        okErrorModalButtonRef.current?.focus()
      }, 500)
    }
  }, [errorMessage, isCredentialsMissing])

  return (
    <S.Wrapper>
      <S.Logo aria-label="Logo Let's code">LET&#39;S CODE</S.Logo>
      <S.Actions>
        {!isLogged && (
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
              <S.FormLoginDesktop
                onSubmit={handleSubmitFormLogin}
                ref={formRefDesk}
              >
                <S.Input
                  type="text"
                  placeholder="User"
                  ref={userRefDesk}
                  disabled={isLoading}
                />
                <S.Input
                  type="password"
                  placeholder="Password"
                  ref={passwordRefDesk}
                  disabled={isLoading}
                />

                {isLoading ? (
                  <ActionButton type="button" aria-label="Loding login" light>
                    <S.LoginLoader size={24} />
                  </ActionButton>
                ) : (
                  <ActionButton type="submit" aria-label="Login button" light>
                    <LogInCircle size={24} />
                  </ActionButton>
                )}
              </S.FormLoginDesktop>
            </S.Desktop>
          </>
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
        <S.ModalContent dark>
          <S.FormLoginMobile onSubmit={handleSubmitFormLogin} ref={formRef}>
            <S.FormLoginMobileTitle>Login</S.FormLoginMobileTitle>

            <S.Input type="text" placeholder="User" ref={userRef} />
            <S.Input type="password" placeholder="Password" ref={passwordRef} />

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

      {/* Login error alert */}
      <Modal isOpen={!!errorMessage || isCredentialsMissing}>
        <S.ModalContent>
          <S.LoginErrorIcon size={50} />
          <S.ModalMessage>
            {isCredentialsMissing
              ? 'Please type user and password'
              : errorMessage}
          </S.ModalMessage>
          <S.ModalButton
            type="button"
            onClick={() => {
              cleanErrorMessage()
              setIsCredentialsMissing(false)
            }}
            ref={okErrorModalButtonRef}
          >
            Ok
          </S.ModalButton>
        </S.ModalContent>
      </Modal>
    </S.Wrapper>
  )
}
