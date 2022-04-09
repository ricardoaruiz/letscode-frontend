import React from 'react'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from './styles/GlobalStyles'
import { theme } from './styles/Theme'
import { Board } from './components/Board'
import { AuthProvider } from './contexts/AuthContext'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <AuthProvider>
        <Board />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
