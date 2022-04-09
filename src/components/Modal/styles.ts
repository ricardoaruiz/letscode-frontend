import styled, { css } from 'styled-components'
import { lighten } from 'polished'

import { ModalProps } from './types'

type OverlayProps = Pick<ModalProps, 'isOpen'>

const overlayModifiers = {
  open: css`
    visibility: visible;
    opacity: 1;
    pointer-events: all;
  `,
  close: css`
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
  `,
}

export const Overlay = styled.div<OverlayProps>`
  ${({ isOpen = false }) => css`
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.7);

    transition: all 0.3s;

    ${isOpen ? overlayModifiers.open : overlayModifiers.close}
  `};
`

export const Content = styled.div`
  z-index: 20;
  outline: none;
`

export const ActionButton = styled.button`
  ${({ theme }) => css`
    outline: none;
    background-color: transparent;
    border: none;
    color: ${theme.colors.white};
    cursor: pointer;

    position: relative;
    top: -140px;
    right: -280px;

    &:hover {
      color: ${theme.colors.primary};
    }
    &:active {
      color: ${lighten(0.2, theme.colors.primary)};
    }
    &:focus {
      color: ${theme.colors.primary};
    }
  `}
`
