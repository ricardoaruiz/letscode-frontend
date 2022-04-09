import styled, { css } from 'styled-components'

import { LaneProps } from './types'

type WrapperProps = Pick<LaneProps, 'showRightBorder'>

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, showRightBorder = true }) => css`
    border-right: ${showRightBorder
      ? `4px solid ${theme.colors.primary}`
      : 'unset'};
  `};
`

export const Title = styled.h2`
  ${({ theme }) => css`
    font-size: 2.4rem;
    font-weight: 700;
    text-align: center;
    padding: 20px 0;
    color: ${theme.colors.primary};
    border-bottom: 4px solid ${theme.colors.primary};
    border-top: 4px solid ${theme.colors.primary};
    background-color: ${theme.colors.secondBlack};
  `};
`
