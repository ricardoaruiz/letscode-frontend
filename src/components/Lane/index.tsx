import React from 'react'

import * as S from './styles'
import { LaneProps } from './types'

export const Lane: React.VFC<LaneProps> = ({
  title,
  showRightBorder = true,
}) => {
  return (
    <S.Wrapper
      showRightBorder={showRightBorder}
      role="list"
      aria-label={`${title} list`}
    >
      <S.Title>{title}</S.Title>
    </S.Wrapper>
  )
}
