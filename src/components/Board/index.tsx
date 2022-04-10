import React from 'react'

import { Card } from '../Card'
import { Cards } from '../../services/useCard/types'
import { CardValues } from '../Card/types'
import { Header } from '../Header'
import { Lane } from '../Lane'
import { LANE_PATH } from './constants'
import { Loader } from '../Loader'
import { Modal } from '../Modal'
import { useAuth } from '../../contexts/AuthContext'
import { useCard } from '../../services/useCard'

import * as S from './styles'

const INITIAL_CARDS = {
  todo: [],
  doing: [],
  done: [],
}

export const Board = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [cards, setCards] = React.useState<Cards>(INITIAL_CARDS)
  const [showNewCard, setShowNewCard] = React.useState(false)
  const [showRemoveCardConfirmation, setShowRemoveCardConfirmation] =
    React.useState(false)
  const [selectedCardToRemove, setSeletedCardToRemove] =
    React.useState<string>()
  const { getCards, createCard, removeCard, updateCard } = useCard()
  const { isLogged, logout, isSessionExpired, setIsSessionExpired } = useAuth()

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
        setShowNewCard(false)
        setIsLoading(true)
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
        console.error('Board.confirmCreatedCard', error)
      } finally {
        setIsLoading(false)
      }
    },
    [createCard]
  )

  /**
   *
   */
  const confirmRemoveCard = React.useCallback(
    async (id: string | undefined) => {
      try {
        setIsLoading(true)
        if (!id) return
        const cards = await removeCard(id)
        cards && setCards(cards)
        setSeletedCardToRemove(undefined)
      } catch (error) {
        // TODO handle error
        console.error('Board.confirmRemoveCard', error)
      } finally {
        setIsLoading(false)
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
  const confirmUpdateCard = React.useCallback(
    async (
      card: CardValues,
      currentLane: string = card.list,
      futureLane: string = card.list
    ) => {
      try {
        setIsLoading(true)
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
        console.error('Board.confirmUpdatedCard', error)
      } finally {
        setIsLoading(false)
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

      const currentLane = card.list
      const futureLane = LANE_PATH[currentLane][direction]

      if (futureLane) {
        confirmUpdateCard(
          { ...card, list: futureLane },
          currentLane,
          futureLane
        )
      }
    },
    [confirmUpdateCard, findCardById]
  )

  /**
   *
   */
  const handleOnSessionExpired = React.useCallback(() => {
    logout()
    setIsSessionExpired(false)
  }, [logout, setIsSessionExpired])

  /**
   *
   */
  const loadCards = React.useCallback(async () => {
    try {
      setIsLoading(true)
      const cards = await getCards()
      cards && setCards(cards)
    } catch (error) {
      // TODO handle errors
      console.error('Board.loadCards', error)
    } finally {
      setIsLoading(false)
    }
  }, [getCards])

  /**
   *
   */
  React.useEffect(() => {
    isLogged ? loadCards() : setCards(INITIAL_CARDS)
  }, [isLogged, loadCards])

  React.useEffect(() => {
    setShowRemoveCardConfirmation(!!selectedCardToRemove)
  }, [selectedCardToRemove])

  return (
    <S.Main>
      <Loader isVisisble={isLoading} />
      <Header onNewCard={openNewCard} />
      <Lane
        title="To Do"
        cards={cards['todo']}
        onSave={(card) => confirmUpdateCard(card)}
        onDeleteCard={setSeletedCardToRemove}
        onForwardCard={(id: string) => confirmMoveCard(id, 'next')}
        onBackwardCard={(id: string) => confirmMoveCard(id, 'back')}
      />
      <Lane
        title="Doing"
        cards={cards['doing']}
        onSave={(card) => confirmUpdateCard(card)}
        onDeleteCard={setSeletedCardToRemove}
        onForwardCard={(id: string) => confirmMoveCard(id, 'next')}
        onBackwardCard={(id: string) => confirmMoveCard(id, 'back')}
      />
      <Lane
        title="Done"
        cards={cards['done']}
        onSave={(card) => confirmUpdateCard(card)}
        onDeleteCard={setSeletedCardToRemove}
        onForwardCard={(id: string) => confirmMoveCard(id, 'next')}
        onBackwardCard={(id: string) => confirmMoveCard(id, 'back')}
      />

      {/* New Card Modal */}
      <Modal isOpen={showNewCard} closeOnEsc={() => setShowNewCard(false)}>
        <S.NewTaskModalContent
          role="alertdialog"
          aria-label="new card modal"
          aria-hidden={!showNewCard}
        >
          <Card
            onSave={confirmCreateCard}
            onCancel={() => setShowNewCard(false)}
            list="todo"
          />
        </S.NewTaskModalContent>
      </Modal>

      {/* Remove card confirmation  */}
      <Modal isOpen={showRemoveCardConfirmation}>
        <S.ModalContent>
          <S.ConfirmDeleteIcon size={50} />

          <S.ModalMessage>Confirm card deletion?</S.ModalMessage>

          <S.ModalButtons>
            <S.ModalButton
              type="button"
              onClick={() => {
                setShowRemoveCardConfirmation(false)
                confirmRemoveCard(selectedCardToRemove)
              }}
            >
              Yes
            </S.ModalButton>
            <S.ModalButton
              type="button"
              onClick={() => setSeletedCardToRemove(undefined)}
            >
              No
            </S.ModalButton>
          </S.ModalButtons>
        </S.ModalContent>
      </Modal>

      {/* Expired Session Modal */}
      <Modal isOpen={isSessionExpired}>
        <S.ModalContent>
          <S.SessionExpiredIcon size={50} />

          <S.ModalMessage>
            Expired session. Please do login again
          </S.ModalMessage>

          <S.ModalButton type="button" onClick={handleOnSessionExpired}>
            Ok
          </S.ModalButton>
        </S.ModalContent>
      </Modal>
    </S.Main>
  )
}
