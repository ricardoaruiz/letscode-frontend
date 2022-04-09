import React from 'react'

import { Lane } from '../Lane'
import { Header } from '../Header'
import { Modal } from '../Modal'
import { Card } from '../Card'
import { CardValues } from '../Card/types'
import { Cards } from '../../services/useCard/types'

import { useCard } from '../../services/useCard'

import * as S from './styles'

type DunamicPath = {
  [key: string]: { next: string; back: string }
}

const LANE_PATH: DunamicPath = {
  todo: { next: 'doing', back: '' },
  doing: { next: 'done', back: 'todo' },
  done: { next: '', back: 'doing' },
}

export const Board = () => {
  const [cards, setCards] = React.useState<Cards>({
    todo: [],
    doing: [],
    done: [],
  })
  const [showNewCard, setShowNewCard] = React.useState(false)
  const { getCards, createCard, removeCard, updateCard } = useCard()

  /**
   *
   */
  const openNewCard = React.useCallback(() => {
    setShowNewCard(true)
  }, [])

  /**
   *
   */
  const confirmCreateCard = React.useCallback(
    async (card: CardValues) => {
      try {
        const createdCard = await createCard(card)
        if (createdCard) {
          setShowNewCard(false)
          setCards((state) => ({
            ...state,
            todo: [...state['todo'], createdCard],
          }))
        }
      } catch (error) {
        // TODO handle error
        console.error(error)
      }
    },
    [createCard]
  )

  /**
   *
   */
  const confirmRemoveCard = React.useCallback(
    async (id: string) => {
      try {
        const cards = await removeCard(id)
        cards && setCards(cards)
      } catch (error) {
        // TODO handle error
        console.error(error)
      }
    },
    [removeCard]
  )

  /**
   *
   */
  const findCardById = React.useCallback(
    (id: string) => {
      return (
        cards['todo'].find((card) => card.id === id) ||
        cards['doing'].find((card) => card.id === id) ||
        cards['done'].find((card) => card.id === id)
      )
    },
    [cards]
  )

  /**
   *
   */
  const moveCard = React.useCallback(
    async (card: CardValues, currentLane: string, futureLane: string) => {
      try {
        const updatedCard = await updateCard(card)

        if (updatedCard) {
          setCards((state) => {
            const cardsCopy = { ...state }

            cardsCopy[currentLane] = cardsCopy[currentLane].filter(
              (currentCard) => currentCard.id != card.id
            )

            cardsCopy[futureLane].push(updatedCard)

            return cardsCopy
          })
        }
      } catch (error) {
        // TODO handle errors
        console.error(error)
      }
    },
    [updateCard]
  )

  /**
   *
   */
  const confirmMoveCard = React.useCallback(
    (id: string, direction: 'next' | 'back') => {
      const card = findCardById(id)

      if (!card) return

      const futureLane = LANE_PATH[card.list][direction]
      if (futureLane) {
        moveCard({ ...card, list: futureLane }, card.list, futureLane)
      }
    },
    [moveCard, findCardById]
  )

  /**
   *
   */
  const loadCards = React.useCallback(async () => {
    const cards = await getCards()
    cards && setCards(cards)
  }, [getCards])

  /**
   *
   */
  React.useEffect(() => {
    loadCards()
  }, [loadCards])

  return (
    <S.Main>
      <Header onNewCard={openNewCard} />
      <Lane
        title="To Do"
        cards={cards['todo']}
        onDeleteCard={confirmRemoveCard}
        onForwardCard={(id: string) => confirmMoveCard(id, 'next')}
        onBackwardCard={(id: string) => confirmMoveCard(id, 'back')}
      />
      <Lane
        title="Doing"
        cards={cards['doing']}
        onDeleteCard={confirmRemoveCard}
        onForwardCard={(id: string) => confirmMoveCard(id, 'next')}
        onBackwardCard={(id: string) => confirmMoveCard(id, 'back')}
      />
      <Lane
        title="Done"
        cards={cards['done']}
        onDeleteCard={confirmRemoveCard}
        onForwardCard={(id: string) => confirmMoveCard(id, 'next')}
        onBackwardCard={(id: string) => confirmMoveCard(id, 'back')}
      />

      <Modal isOpen={showNewCard} closeOnEsc={() => setShowNewCard(false)}>
        <S.NewTaskModalContent>
          <Card
            onSave={confirmCreateCard}
            onCancel={() => setShowNewCard(false)}
            list="todo"
          />
        </S.NewTaskModalContent>
      </Modal>
    </S.Main>
  )
}
