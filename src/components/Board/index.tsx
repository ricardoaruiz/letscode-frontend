import React from 'react'

import { Lane } from '../Lane'
import { Header } from '../Header'
import { Modal } from '../Modal'
import { Card } from '../Card'
import { CardValues } from '../Card/types'
import { Cards } from '../../services/useCard/types'

import { useCard } from '../../services/useCard'

import * as S from './styles'

export const Board = () => {
  const [cards, setCards] = React.useState<Cards>({
    todo: [],
    doing: [],
    done: [],
  })
  const [showNewCard, setShowNewCard] = React.useState(false)
  const { getCards, createCard } = useCard()

  const createNewTask = React.useCallback(() => {
    setShowNewCard(true)
  }, [])

  const saveCard = React.useCallback(
    async (card: CardValues) => {
      setShowNewCard(false)
      createCard(card)
    },
    [createCard]
  )

  const loadCards = React.useCallback(async () => {
    const cards = await getCards()
    cards && setCards(cards)
  }, [getCards])

  React.useEffect(() => {
    loadCards()
  }, [loadCards])

  return (
    <S.Main>
      <Header onNewTask={createNewTask} />
      <Lane title="To Do" cards={cards['todo']} />
      <Lane title="Doing" cards={cards['doing']} />
      <Lane title="Done" cards={cards['done']} />

      <Modal isOpen={showNewCard} closeOnEsc={() => setShowNewCard(false)}>
        <S.NewTaskModalContent>
          <Card
            onSave={saveCard}
            onCancel={() => setShowNewCard(false)}
            list="todo"
          />
        </S.NewTaskModalContent>
      </Modal>
    </S.Main>
  )
}
