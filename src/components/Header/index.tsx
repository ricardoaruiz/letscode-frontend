import React from 'react'

import * as S from './styles'

export const Header = () => {
  return (
    <S.Wrapper>
      <S.Logo aria-label="Logo Let's code">LET&#39;S CODE</S.Logo>
      <S.Actions>
        <form>
          <S.Input type="text" placeholder="User" />
          <S.Input type="password" placeholder="Password" />
          <S.LoginButton role="button" aria-label="Login button" size={24} />
        </form>
      </S.Actions>
    </S.Wrapper>
  )
}
