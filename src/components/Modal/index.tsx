import React from 'react'
import { WindowClose } from '@styled-icons/boxicons-regular'

import { ModalProps } from './types'

import * as S from './styles'

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen = false,
  closeOnEsc,
}) => {
  React.useEffect(() => {
    const body = document.querySelector('body')

    if (body) {
      body.style.overflowY = isOpen ? 'hidden' : 'auto'
    }
  }, [isOpen])

  const handleKeyboardEvent = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        closeOnEsc && closeOnEsc()
      }
    },
    [closeOnEsc]
  )

  return (
    <S.Overlay isOpen={isOpen}>
      <S.ActionButton aria-label="close modal" onClick={closeOnEsc}>
        <WindowClose size={24} />
      </S.ActionButton>

      <S.Content
        role="alertdialog"
        aria-hidden={!isOpen}
        onKeyUp={handleKeyboardEvent}
        tabIndex={1}
      >
        {children}
      </S.Content>
    </S.Overlay>
  )
}
