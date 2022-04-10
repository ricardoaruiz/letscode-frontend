import React from 'react'
import {
  renderWithContext,
  screen,
  waitFor,
  fireEvent,
} from '../../utils/test-utils'

import { Card } from '.'

describe('<Card />', () => {
  it('should be render correctly default mode (view mode)', () => {
    renderWithContext(
      <Card
        id="1"
        title="New Task"
        content="This is the content of new task"
        list="todo"
        onDelete={jest.fn()}
        onBack={jest.fn()}
        onNext={jest.fn()}
        onSave={jest.fn()}
      />
    )
    expect(
      screen.getByRole('heading', { name: /new task/i })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/this is the content of new task/i)
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /back button/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /remove button/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /next button/i })
    ).toBeInTheDocument()
  })

  it('should be render correctly edit mode', async () => {
    renderWithContext(
      <Card
        id="1"
        title="New Task"
        content="This is the content of new task"
        list="todo"
        onDelete={jest.fn()}
        onBack={jest.fn()}
        onNext={jest.fn()}
        onSave={jest.fn()}
      />
    )

    const viewTitle = screen.getByRole('heading', { name: /new task/i })
    expect(viewTitle).toBeInTheDocument()

    const viewContent = screen.getByText(/this is the content of new task/i)
    expect(viewContent).toBeInTheDocument()

    const editButton = screen.getByRole('button', { name: /edit/i })
    expect(editButton).toBeInTheDocument()

    fireEvent.click(editButton)

    expect(
      await screen.findByRole('textbox', {
        name: /type the title here/i,
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('textbox', {
        name: /type the content here/i,
      })
    ).toBeInTheDocument()

    const cancelButton = screen.getByRole('button', {
      name: /cancel edit button/i,
    })
    expect(cancelButton).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /save edit button/i,
      })
    ).toBeInTheDocument()

    expect(viewTitle).not.toBeInTheDocument()
    expect(viewContent).not.toBeInTheDocument()
    expect(editButton).not.toBeInTheDocument()

    fireEvent.click(cancelButton)

    expect(
      await screen.findByRole('heading', { name: /new task/i })
    ).toBeInTheDocument()
    expect(
      await screen.findByText(/this is the content of new task/i)
    ).toBeInTheDocument()
    expect(
      await screen.findByRole('button', { name: /edit/i })
    ).toBeInTheDocument()
  })

  it('should be call delete callback when delete button is clicked', async () => {
    const mockedOnDelete = jest.fn()
    renderWithContext(
      <Card
        id="10"
        title="New Task"
        content="This is the content of new task"
        list="todo"
        onDelete={mockedOnDelete}
        onBack={jest.fn()}
        onNext={jest.fn()}
        onSave={jest.fn()}
      />
    )

    const removeButton = await screen.findByRole('button', {
      name: /remove button/i,
    })

    fireEvent.click(removeButton)

    await waitFor(() => {
      expect(mockedOnDelete).toBeCalledTimes(1)
    })
    await waitFor(() => {
      expect(mockedOnDelete).toBeCalledWith('10')
    })
  })

  it('should be call back callback when back button is clicked', async () => {
    const mockedOnBack = jest.fn()
    renderWithContext(
      <Card
        id="10"
        title="New Task"
        content="This is the content of new task"
        list="todo"
        onDelete={jest.fn()}
        onBack={mockedOnBack}
        onNext={jest.fn()}
        onSave={jest.fn()}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /back button/i }))

    await waitFor(() => {
      expect(mockedOnBack).toBeCalledTimes(1)
    })
    expect(mockedOnBack).toBeCalledWith('10')
  })

  it('should be call next callback when next button is clicked', async () => {
    const mockedOnNext = jest.fn()
    renderWithContext(
      <Card
        id="10"
        title="New Task"
        content="This is the content of new task"
        list="todo"
        onDelete={jest.fn()}
        onBack={jest.fn()}
        onNext={mockedOnNext}
        onSave={jest.fn()}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /next button/i }))

    await waitFor(() => {
      expect(mockedOnNext).toBeCalledTimes(1)
    })
    expect(mockedOnNext).toBeCalledWith('10')
  })

  it('should be call save callback when save button is clicked', async () => {
    const mockedOnSave = jest.fn()
    renderWithContext(
      <Card
        id="10"
        title="New Task"
        content="This is the content of new task"
        list="todo"
        onDelete={jest.fn()}
        onBack={jest.fn()}
        onNext={jest.fn()}
        onSave={mockedOnSave}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /edit/i }))

    const inputTitle = await screen.findByPlaceholderText(
      /type the title here/i
    )
    expect(inputTitle).toBeInTheDocument()

    fireEvent.change(inputTitle, { target: { value: 'updated title' } })

    await waitFor(() => {
      expect(inputTitle).toHaveValue('updated title')
    })

    const inputContent = await screen.findByLabelText(/type the content here/i)
    expect(inputContent).toBeInTheDocument()
    fireEvent.change(inputContent, { target: { value: 'updated content' } })
    await waitFor(() => {
      expect(inputContent).toHaveValue('updated content')
    })

    fireEvent.click(screen.getByRole('button', { name: /save edit button/i }))

    await waitFor(() => {
      expect(mockedOnSave).toBeCalledWith({
        id: '10',
        title: 'updated title',
        content: 'updated content',
        list: 'todo',
      })
    })
  })

  it('should ot be call save callback when save button is clicked and content is empty', async () => {
    const mockedOnSave = jest.fn()
    renderWithContext(
      <Card
        id="10"
        title="New Task"
        content="This is the content of new task"
        list="todo"
        onDelete={jest.fn()}
        onBack={jest.fn()}
        onNext={jest.fn()}
        onSave={mockedOnSave}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /edit/i }))

    const inputTitle = await screen.findByPlaceholderText(
      /type the title here/i
    )
    expect(inputTitle).toBeInTheDocument()
    fireEvent.change(inputTitle, { target: { value: 'updated title' } })
    await waitFor(() => {
      expect(inputTitle).toHaveValue('updated title')
    })

    const inputContent = await screen.findByLabelText(/type the content here/i)
    expect(inputContent).toBeInTheDocument()
    fireEvent.change(inputContent, { target: { value: '' } })
    await waitFor(() => {
      expect(inputContent).toHaveValue('')
    })

    fireEvent.click(screen.getByRole('button', { name: /save edit button/i }))

    await waitFor(() => {
      expect(mockedOnSave).not.toHaveBeenCalled()
    })
  })

  it('should not be call save callback when save button is clicked and title is empty', async () => {
    const mockedOnSave = jest.fn()
    renderWithContext(
      <Card
        id="10"
        title="New Task"
        content="This is the content of new task"
        list="todo"
        onDelete={jest.fn()}
        onBack={jest.fn()}
        onNext={jest.fn()}
        onSave={mockedOnSave}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /edit/i }))

    const inputTitle = await screen.findByPlaceholderText(
      /type the title here/i
    )
    expect(inputTitle).toBeInTheDocument()
    fireEvent.change(inputTitle, { target: { value: '' } })
    await waitFor(() => {
      expect(inputTitle).toHaveValue('')
    })

    const inputContent = await screen.findByLabelText(/type the content here/i)
    expect(inputContent).toBeInTheDocument()
    fireEvent.change(inputContent, { target: { value: 'updated content' } })
    await waitFor(() => {
      expect(inputContent).toHaveValue('updated content')
    })

    fireEvent.click(screen.getByRole('button', { name: /save edit button/i }))

    await waitFor(() => {
      expect(mockedOnSave).not.toBeCalled()
    })
  })
})
