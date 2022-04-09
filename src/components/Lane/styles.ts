import styled, { css } from 'styled-components'
import { Wrapper as Card } from '../Card/styles'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    border-left: 2px solid ${theme.colors.primary};
    border-right: 2px solid ${theme.colors.primary};

    ${Card} + ${Card} {
      margin-top: 20px;
    }
  `};
`

export const Title = styled.h2`
  ${({ theme }) => css`
    font-size: 2.4rem;
    font-weight: 700;
    text-align: center;
    padding: 20px 0;
    color: ${theme.colors.primary};
    border-top: 1px solid ${theme.colors.primary};
    border-bottom: 2px solid ${theme.colors.primary};
    background-color: ${theme.colors.secondBlack};
  `};
`
export const Content = styled.div`
  padding: 20px;
`
