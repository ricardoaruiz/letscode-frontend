import styled, { css } from 'styled-components'
import media from 'styled-media-query'
import { Error } from '@styled-icons/boxicons-regular'

import { Wrapper as Header } from '../Header/styles'

export const Main = styled.main`
  height: 100vh;
  display: grid;
  grid-template-rows: [header] 80px [content] auto;
  grid-template-columns: 1fr;

  ${Header} {
    grid-row: header;
    grid-column: 1;
  }

  ${media.greaterThan('medium')`
    grid-template-columns: [todo] 1fr [doing] 1fr [done] 1fr;

    ${Header} {
      grid-column: 1 / 4;
    }

  `}
`

export const NewTaskModalContent = styled.div`
  max-width: 480px;
  width: 100%;
`

export const SessionExpiredContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 20px;

    background-color: ${theme.colors.white};
    height: 150px;
    width: 250px;
  `};
`

export const SessionExpiredIcon = styled(Error)`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    margin-bottom: 20px;
  `};
`

export const SessionExpiredMessage = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
`
export const SessionExpiredButton = styled.button`
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
  `};
`
