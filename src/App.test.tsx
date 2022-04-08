import React from 'react'
import { render, screen } from './utils/test-utils'

import App from './App'

describe('<App />', () => {
  it('should be render correctly', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: 'Wellcome to React with webpack' })
    )
  })
})
