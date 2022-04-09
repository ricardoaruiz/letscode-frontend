import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from '../contexts/AuthContext'
import { theme } from '../styles/Theme'

const renderWithContext = (children: React.ReactNode) => {
  return render(
    <ThemeProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}

export * from '@testing-library/react'

export { renderWithContext }
