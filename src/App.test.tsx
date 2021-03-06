import React from 'react'
import { render, screen } from './utils/test-utils'

import App from './App'

describe('<App />', () => {
  it('should be render correctly', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /to do/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /doing/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /done/i })).toBeInTheDocument()
  })
})
