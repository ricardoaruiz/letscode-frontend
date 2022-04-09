import React from 'react'

import { LaneProps } from './types'
import { Card } from '../Card'
import { CardValues } from '../Card/types'

import * as S from './styles'

export const Lane: React.VFC<LaneProps> = ({ title, cards, onDeleteCard }) => {
  return (
    <S.Wrapper role="list" aria-label={`${title} list`}>
      <S.Title>{title}</S.Title>
      <S.Content>
        {cards.map(({ id, title, content, list }) => (
          <Card
            key={id}
            id={id}
            title={title}
            content={content}
            list={list}
            onSave={(card: CardValues) => console.log(card)}
            onDelete={onDeleteCard}
          />
        ))}
      </S.Content>
    </S.Wrapper>
  )
}
