import styled, { css } from 'styled-components'
import { darken } from 'polished'
import media from 'styled-media-query'

export const Wrapper = styled.header`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondBlack};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  `};
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

    & + input {
      margin-left: 10px;
    }

    &:focus {
      border: 1px solid ${darken(0.2, theme.colors.primary)};
      color: ${darken(0.2, theme.colors.primary)};
    }
  `};
`
