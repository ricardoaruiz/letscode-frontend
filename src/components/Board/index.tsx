import React from 'react'

import { Lane } from '../Lane'
import { Header } from '../Header'
import { Modal } from '../Modal'
import { Card } from '../Card'
import { CardValues } from '../Card/types'

import * as S from './styles'

export const Board = () => {
  const [showNewTask, setShowNewTask] = React.useState(false)

  const createNewTask = React.useCallback(() => {
    setShowNewTask(true)
  }, [])

  const saveNewTask = React.useCallback((card: CardValues) => {
    console.log('saveNewTask', card)
    setShowNewTask(false)
  }, [])

  return (
    <S.Main>
      <Header onNewTask={createNewTask} />
      <Lane title="To Do" />
      <Lane title="Doing" />
      <Lane title="Done" />

      <Modal isOpen={showNewTask} closeOnEsc={() => setShowNewTask(false)}>
        <S.NewTaskModalContent>
          <Card onSave={saveNewTask} onCancel={() => setShowNewTask(false)} />
        </S.NewTaskModalContent>
      </Modal>
    </S.Main>
  )
}
