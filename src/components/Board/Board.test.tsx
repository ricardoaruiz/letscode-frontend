import React from 'react'
import {
  renderWithContext,
  screen,
  fireEvent,
  waitFor,
} from '../../utils/test-utils'

import { Board } from './index'

describe('<Board />', () => {
  it('should be render correctly', () => {
    renderWithContext(<Board />)
    expect(screen.getByRole('heading', { name: /to do/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /doing/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /done/i })).toBeInTheDocument()
  })

  it('should be open show new card modal', async () => {
    renderWithContext(<Board />)

    const inputUser = screen.getByPlaceholderText(/user/i)
    const inputPassword = screen.getByPlaceholderText(/password/i)
    const loginButton = screen.getByLabelText(/login button/i)

    fireEvent.change(inputUser, { target: { value: 'letscode' } })
    fireEvent.change(inputPassword, { target: { value: 'lets@123' } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(screen.getByLabelText(/new task/i)).toBeInTheDocument()
    })
    const newTaskButton = await screen.findByRole('button', {
      name: /new task/i,
    })

    fireEvent.click(newTaskButton)

    const newCardModal = await screen.findByRole('alertdialog', {
      name: /new card modal/i,
    })
    expect(newCardModal).toBeInTheDocument()
    expect(newCardModal).toHaveAttribute('aria-hidden', 'false')

    const cancelButton = screen.getByRole('button', {
      name: /cancel edit button/i,
    })
    expect(cancelButton).toBeInTheDocument()
    fireEvent.click(cancelButton)

    expect(newCardModal).toHaveAttribute('aria-hidden', 'true')
  })
})
