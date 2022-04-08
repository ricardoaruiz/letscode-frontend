import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { myTheme } from '../styles/Theme'

const renderWithContext = (children: React.ReactNode) => {
  return render(<ThemeProvider theme={myTheme}>{children}</ThemeProvider>)
}

export * from '@testing-library/react'

export { renderWithContext }
