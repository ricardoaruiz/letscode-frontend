import React from 'react'

import { Lane } from '../Lane'
import { Header } from '../Header'

import * as S from './styles'

export const Board = () => {
  return (
    <S.Main>
      <Header />
      <Lane title="To Do" />
      <Lane title="Doing" />
      <Lane title="Done" showRightBorder={false} />
    </S.Main>
  )
}
