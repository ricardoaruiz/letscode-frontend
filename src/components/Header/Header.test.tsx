import React from 'react'
import {
  renderWithContext,
  screen,
  fireEvent,
  waitFor,
} from '../../utils/test-utils'

import { Header } from '.'

describe('<Header />', () => {
  it('should be render correctly', () => {
    renderWithContext(<Header onNewCard={jest.fn()} />)
    expect(screen.getByLabelText(/logo let's code/i)).toBeInTheDocument()
    expect(screen.getAllByPlaceholderText(/user/i)).toHaveLength(2)
    expect(screen.getAllByPlaceholderText(/password/i)).toHaveLength(2)
    expect(screen.getAllByLabelText(/login button/i)).toHaveLength(2)
  })

  it('should be login successfuly', async () => {
    renderWithContext(<Header onNewCard={jest.fn()} />)
    const loginButton = screen.getAllByLabelText(/login button/i)[0]
    fireEvent.click(loginButton)

    const inputUser = screen.getAllByPlaceholderText(/user/i)[0]
    const inputPassword = screen.getAllByPlaceholderText(/password/i)[0]
    fireEvent.change(inputUser, { target: { value: 'letscode' } })
    fireEvent.change(inputPassword, { target: { value: 'lets@123' } })
    const loginMobileButton = await screen.findByRole('button', {
      name: /Login mobile button/i,
    })

    fireEvent.click(loginMobileButton)

    await waitFor(() => {
      expect(screen.getByLabelText(/new task/i)).toBeInTheDocument()
    })
    expect(
      await screen.findByLabelText(/user information/i)
    ).toBeInTheDocument()
    expect(await screen.findByLabelText(/logout/i)).toBeInTheDocument()
  })
})
