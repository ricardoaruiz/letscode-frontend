import React from 'react'
import { renderWithContext, screen } from '../../utils/test-utils'

import { Lane } from './index'

describe('<Lane />', () => {
  it('should be render correctly', () => {
    renderWithContext(<Lane title="To Do" />)
    expect(screen.getByRole('heading', { name: /to do/i }))
    expect(screen.getByRole('list')).toHaveStyle({
      'border-left': '2px solid #F5B025',
      'border-right': '2px solid #F5B025',
    })
  })
})
