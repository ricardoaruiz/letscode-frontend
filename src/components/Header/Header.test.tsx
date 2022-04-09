import React from 'react'
import { renderWithContext, screen } from '../../utils/test-utils'

import { Header } from '.'

describe('<Header />', () => {
  it('should be render correctly', () => {
    renderWithContext(<Header />)
    expect(screen.getByLabelText(/logo let's code/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/user/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/login button/i)).toBeInTheDocument()
  })
})
