import React from 'react'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from './styles/GlobalStyles'
import { theme } from './styles/Theme'
import { Board } from './components/Board'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Board />
    </ThemeProvider>
  )
}

export default App
