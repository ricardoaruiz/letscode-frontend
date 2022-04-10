import styled, { css } from 'styled-components'

import { LoaderProps } from './types'

const overlayModifiers = {
  visible: css`
    visibility: visible;
    opacity: 1;
    pointer-events: all;
  `,
  hidden: css`
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
  `,
}

export const OverLay = styled.div<LoaderProps>`
  ${({ isVisisble = false }) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    ${isVisisble ? overlayModifiers.visible : overlayModifiers.hidden}
  `};
`
