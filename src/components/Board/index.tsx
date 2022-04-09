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
  const { getCards, createCard, removeCard } = useCard()

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
  const loadCards = React.useCallback(async () => {
    const cards = await getCards()
    cards && setCards(cards)
  }, [getCards])

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
      />
      <Lane
        title="Doing"
        cards={cards['doing']}
        onDeleteCard={confirmRemoveCard}
      />
      <Lane
        title="Done"
        cards={cards['done']}
        onDeleteCard={confirmRemoveCard}
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
