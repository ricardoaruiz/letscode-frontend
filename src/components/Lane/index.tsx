import React from 'react'

import { LaneProps } from './types'
import { Card } from '../Card'

import * as S from './styles'

export const Lane: React.VFC<LaneProps> = ({ title }) => {
  return (
    <S.Wrapper role="list" aria-label={`${title} list`}>
      <S.Title>{title}</S.Title>
      <S.Content>
        <Card
          id="1"
          title="New Task"
          content="This is the content of new task very large to test how to will be display"
        />
        <Card
          title="New Task"
          content="This is the content of new task very large to test how to will be display"
        />
      </S.Content>
    </S.Wrapper>
  )
}
