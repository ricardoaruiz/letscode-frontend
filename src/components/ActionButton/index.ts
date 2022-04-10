import styled, { css } from 'styled-components'
import { lighten } from 'polished'

import { ActionButtonProps } from './types'

export const ActionButton = styled.button<ActionButtonProps>`
  ${({ theme, light }) => css`
    outline: none;
    background-color: transparent;
    border: none;
    color: ${light ? theme.colors.primary : theme.colors.black};
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: ${lighten(0.2, theme.colors.primary)};
    }
    &:active {
      color: ${lighten(0.4, theme.colors.primary)};
    }
    &:focus {
      color: ${theme.colors.primary};
    }
  `}
`
