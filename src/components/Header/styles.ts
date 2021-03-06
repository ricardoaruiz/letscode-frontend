import styled, { css, keyframes } from 'styled-components'
import { darken } from 'polished'
import media from 'styled-media-query'
import { LoaderAlt, Error } from '@styled-icons/boxicons-regular'

export const Wrapper = styled.header`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondBlack};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  `};
`

export const Mobile = styled.div`
  ${media.lessThan('medium')`
    display: block;
    pointer-events: all;
  `}
  ${media.greaterThan('medium')`
    display: none;
    pointer-events: none;
  `}
`

export const Desktop = styled.div`
  ${media.lessThan('medium')`
    display: none;
    pointer-events: none;
  `}
  ${media.greaterThan('medium')`
    display: block;
    pointer-events: all;
  `}
`

export const Logo = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-size: 1.8rem;
    font-weight: 700;

    ${media.greaterThan('medium')`
      font-size: 2.2rem;
    `}
  `};
`
export const Actions = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  & form {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
  }

  ${media.greaterThan('medium')`
    & form {
      visibility: visible;
      opacity: 1;
      pointer-events: all;
    }
  `}
`

export const Input = styled.input`
  ${({ theme }) => css`
    outline: none;
    padding: 6px 8px;
    background-color: ${theme.colors.black};
    border: 1px solid ${theme.colors.primary};
    color: ${theme.colors.primary};
    border-radius: 4px;
    font-size: 1.4rem;

    &::placeholder {
      color: ${theme.colors.primary};
    }

    &:focus {
      border: 1px solid ${darken(0.2, theme.colors.primary)};
      color: ${darken(0.2, theme.colors.primary)};

      &::placeholder {
        color: ${darken(0.2, theme.colors.primary)};
      }
    }
  `};
`
const infinityRotate = keyframes`
  to{ transform: rotate(360deg); }
`

export const LoginLoader = styled(LoaderAlt)`
  ${({ theme }) => css`
    animation: ${infinityRotate} 2s linear infinite;
    color: ${theme.colors.primary};
  `};
`
export const ModalContent = styled.div<{ dark?: boolean }>`
  ${({ theme, dark = false }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 20px;

    background-color: ${dark ? theme.colors.black : theme.colors.white};
    height: 150px;
  `};
`

export const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`

export const ModalButton = styled.button`
  ${({ theme }) => css`
    outline: none;
    background-color: ${theme.colors.primary};
    border: 1px solid ${theme.colors.primary};
    border-radius: 4px;
    min-width: 100px;
    padding: 5px 15px;
    font-size: 1.4rem;
    font-weight: 700;
    color: ${theme.colors.white};
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.privaryHover};
      border-color: ${theme.colors.privaryHover};
      color: ${theme.colors.black};
    }

    & + button {
      margin-left: 10px;
    }
  `};
`

export const FormLoginDesktop = styled.form`
  & input + input {
    margin-left: 10px;
  }
`

export const FormLoginMobile = styled.form`
  display: grid;
  grid-row-gap: 10px;
`

export const FormLoginMobileTitle = styled.h2`
  ${({ theme }) => css`
    text-align: center;
    font-size: 1.8rem;
    font-weight: 700;
    color: ${theme.colors.primary};
  `};
`
export const FormLoginActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ModalMessage = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
`
export const LoginErrorIcon = styled(Error)`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    margin-bottom: 20px;
  `};
`
