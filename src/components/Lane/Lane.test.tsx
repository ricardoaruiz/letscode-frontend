import React from 'react'
import { renderWithContext, screen } from '../../utils/test-utils'

import { Lane } from './index'

describe('<Lane />', () => {
  it('should be render correctly', () => {
    renderWithContext(<Lane title="To Do" />)
    expect(screen.getByRole('heading', { name: /to do/i }))
    expect(screen.getByRole('list')).toHaveStyle({
      'border-right': '4px solid #F5B025',
    })
  })

  it('should be render without right border', () => {
    renderWithContext(<Lane title="To Do" showRightBorder={false} />)
    expect(screen.getByRole('list')).not.toHaveStyle({
      'border-right': '4px solid #F5B025',
    })
  })
})
