import styled, { css } from 'styled-components'
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
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.7);

    transition: all 0.3s;

    ${isOpen ? overlayModifiers.open : overlayModifiers.close}
  `};
`

export const Content = styled.div`
  z-index: 20;
  outline: none;
  width: 100%;
  max-width: 500px;
  margin: 0 16px;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
`
