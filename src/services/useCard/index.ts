import React from 'react'
import { Card, CardResponse, Cards, UseCard } from './types'
import { useApi } from '../useApi'

const CARDS_URI = '/cards'

export const useCard = (): UseCard => {
  const api = useApi()
  /**
   *
   */
  const convertCardFromApiToView = React.useCallback(
    (card: CardResponse): Card => {
      return {
        id: card.id,
        title: card.titulo,
        content: card.conteudo,
        list: card.lista,
      }
    },
    []
  )

  /**
   *
   */
  const convertCardsFromApiToView = React.useCallback(
    (data: CardResponse[]) => {
      return data.reduce(
        (cards: Cards, card: CardResponse) => {
          cards[card.lista].push(convertCardFromApiToView(card))
          return cards
        },
        {
          todo: [],
          doing: [],
          done: [],
        }
      )
    },
    [convertCardFromApiToView]
  )

  /**
   *
   */
  const convertCardFromViewToApi = React.useCallback((card: Card) => {
    return {
      id: card.id,
      titulo: card.title,
      conteudo: card.content,
      lista: card.list,
    }
  }, [])

  /**
   *
   * @returns
   */
  const getCards = React.useCallback(async () => {
    try {
      const response = await api.get<CardResponse[]>(CARDS_URI)
      return convertCardsFromApiToView(response.data)
    } catch (error) {
      // TODO handle errors
    }
  }, [api, convertCardsFromApiToView])

  /**
   *
   * @param card
   */
  const createCard = React.useCallback(
    async (card: Card): Promise<Card | undefined> => {
      try {
        const response = await api.post<CardResponse>(
          CARDS_URI,
          convertCardFromViewToApi(card)
        )

        return convertCardFromApiToView(response.data)
      } catch (error) {
        // TODO handle errors
      }
    },
    [api, convertCardFromApiToView, convertCardFromViewToApi]
  )

  /**
   *
   * @param id
   */
  const removeCard = React.useCallback(
    async (id: string) => {
      try {
        const response = await api.delete<CardResponse[]>(`${CARDS_URI}/${id}`)
        return convertCardsFromApiToView(response.data)
      } catch (error) {
        // TODO handle erros
      }
    },
    [api, convertCardsFromApiToView]
  )

  /**
   *
   */
  const updateCard = React.useCallback(
    async (card: Card): Promise<Card | undefined> => {
      try {
        const response = await api.put<CardResponse>(
          `${CARDS_URI}/${card.id}`,
          convertCardFromViewToApi(card)
        )

        return convertCardFromApiToView(response.data)
      } catch (error) {
        // TODO handle errors
        console.error(error)
      }
    },
    [api, convertCardFromApiToView, convertCardFromViewToApi]
  )

  return {
    getCards,
    createCard,
    removeCard,
    updateCard,
  }
}
