import styled, { css } from 'styled-components'
import media from 'styled-media-query'
import { Error, QuestionMark } from '@styled-icons/boxicons-regular'

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
    grid-template-columns: repeat(3, 1fr);

    ${Header} {
      grid-column: 1 / 4;
    }
  `}
`

export const NewTaskModalContent = styled.div``

export const ModalContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 20px;

    background-color: ${theme.colors.white};
    height: 150px;
  `};
`

export const ModalMessage = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
`

export const ModalButtons = styled.div`
  display: flex;
  width: 80%;
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

export const SessionExpiredIcon = styled(Error)`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    margin-bottom: 20px;
  `};
`

export const ConfirmDeleteIcon = styled(QuestionMark)`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    margin-bottom: 20px;
  `};
`
