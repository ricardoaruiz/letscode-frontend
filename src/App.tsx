import React from 'react'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from './styles/GlobalStyles'
import { myTheme } from './styles/Theme'

export const App = () => {
  return (
    <ThemeProvider theme={myTheme}>
      {/* Global styles */}
      <GlobalStyles />

      <h1>Wellcome to React with webpack</h1>
    </ThemeProvider>
  )
}

export default App
