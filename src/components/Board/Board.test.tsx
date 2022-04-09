import React from 'react'
import { renderWithContext, screen } from '../../utils/test-utils'

import { Board } from './index'

describe('<Board />', () => {
  it('should be render correctly', () => {
    renderWithContext(<Board />)
    expect(screen.getByRole('heading', { name: /to do/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /doing/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /done/i })).toBeInTheDocument()
  })
})
