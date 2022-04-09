import React from 'react'
import { renderWithContext, screen } from '../../utils/test-utils'

import { Lane } from './index'

const cards = [
  { id: '1', title: 'Title 01', content: 'Content 01', list: 'todo' },
  { id: '2', title: 'Title 02', content: 'Content 02', list: 'todo' },
  { id: '3', title: 'Title 03', content: 'Content 03', list: 'todo' },
]

describe('<Lane />', () => {
  it('should be render correctly', () => {
    renderWithContext(<Lane title="To Do" cards={cards} />)
    expect(screen.getByRole('heading', { name: /to do/i }))
    expect(screen.getByRole('list')).toHaveStyle({
      'border-left': '2px solid #F5B025',
      'border-right': '2px solid #F5B025',
    })
  })
})
