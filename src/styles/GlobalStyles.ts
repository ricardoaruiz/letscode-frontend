import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const GlobalStyles = createGlobalStyle`
  ${reset}

  html {
    font-size: 62.5%;
    font-family: 'Roboto', sans-serif;
  }
`
