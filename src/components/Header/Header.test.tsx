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
    expect(screen.getByPlaceholderText(/user/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/login button/i)).toBeInTheDocument()
  })

  it('should be login successfuly', async () => {
    renderWithContext(<Header onNewCard={jest.fn()} />)
    const inputUser = screen.getByPlaceholderText(/user/i)
    const inputPassword = screen.getByPlaceholderText(/password/i)
    const loginButton = screen.getByLabelText(/login button/i)

    fireEvent.change(inputUser, { target: { value: 'letscode' } })
    fireEvent.change(inputPassword, { target: { value: 'lets@123' } })
    fireEvent.click(loginButton)

    expect(await screen.findByLabelText(/new task/i)).toBeInTheDocument()
    expect(
      await screen.findByLabelText(/user information/i)
    ).toBeInTheDocument()
    expect(await screen.findByLabelText(/logout/i)).toBeInTheDocument()
  })

  it('should not be login successfuly when user not informed', async () => {
    renderWithContext(<Header onNewCard={jest.fn()} />)
    const inputUser = screen.getByPlaceholderText(/user/i)
    const inputPassword = screen.getByPlaceholderText(/password/i)
    const loginButton = screen.getByLabelText(/login button/i)

    fireEvent.change(inputUser, { target: { value: '' } })
    fireEvent.change(inputPassword, { target: { value: 'lets@123' } })
    fireEvent.click(loginButton)

    expect(
      await waitFor(() => {
        return screen.queryByLabelText(/new task/i)
      })
    ).not.toBeInTheDocument()

    expect(
      await waitFor(() => {
        return screen.queryByLabelText(/user information/i)
      })
    ).not.toBeInTheDocument()

    expect(
      await waitFor(() => {
        return screen.queryByLabelText(/logout/i)
      })
    ).not.toBeInTheDocument()
  })

  it('should not be login successfuly when password not informed', async () => {
    renderWithContext(<Header onNewCard={jest.fn()} />)
    const inputUser = screen.getByPlaceholderText(/user/i)
    const inputPassword = screen.getByPlaceholderText(/password/i)
    const loginButton = screen.getByLabelText(/login button/i)

    fireEvent.change(inputUser, { target: { value: 'letscode' } })
    fireEvent.change(inputPassword, { target: { value: '' } })
    fireEvent.click(loginButton)

    expect(
      await waitFor(() => {
        return screen.queryByLabelText(/new task/i)
      })
    ).not.toBeInTheDocument()

    expect(
      await waitFor(() => {
        return screen.queryByLabelText(/user information/i)
      })
    ).not.toBeInTheDocument()

    expect(
      await waitFor(() => {
        return screen.queryByLabelText(/logout/i)
      })
    ).not.toBeInTheDocument()
  })
})
