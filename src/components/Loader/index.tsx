import React from 'react'

import loader from '../../assets/images/loader.svg'
import { LoaderProps } from './types'

import * as S from './styles'

export const Loader: React.FC<LoaderProps> = ({ isVisisble = false }) => {
  return (
    <S.OverLay isVisisble={isVisisble}>
      <img src={loader} alt="Loader" />
    </S.OverLay>
  )
}
