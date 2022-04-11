import React from 'react'
import { render, screen, fireEvent } from '../../utils/test-utils'

import { Modal } from '.'

describe('<Modal />', () => {
  it('should be render correctly', () => {
    const { container } = render(
      <Modal>
        <h3>Title</h3>
        <p>Content</p>
      </Modal>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should be open state render successfuly', () => {
    const { rerender } = render(
      <Modal isOpen={true}>
        <h3>Title</h3>
        <p>Content</p>
      </Modal>
    )

    const modalContent = screen.getByRole('alertdialog')
    expect(modalContent).toHaveAttribute('aria-hidden', 'false')

    rerender(
      <Modal isOpen={false}>
        <h3>Title</h3>
        <p>Content</p>
      </Modal>
    )

    expect(modalContent).toHaveAttribute('aria-hidden', 'true')
  })

  it('should be open close modal when press ESC key', () => {
    const mockedCloseOnEsc = jest.fn()
    render(
      <Modal isOpen={true} closeOnEsc={mockedCloseOnEsc}>
        <h3>Title</h3>
        <p>Content</p>
      </Modal>
    )

    const modalContent = screen.getByRole('alertdialog')
    expect(modalContent).toHaveAttribute('aria-hidden', 'false')

    fireEvent.focus(modalContent)
    fireEvent.keyUp(modalContent, {
      key: 'Escape',
    })

    expect(mockedCloseOnEsc).toHaveBeenCalled()
  })
})
