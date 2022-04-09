import React from 'react'
import API from '../api-config'
import { Card, CardResponse, Cards, UseCard } from './types'

const CARDS_URI = '/cards'

export const useCard = (): UseCard => {
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
      const response = await API.get<CardResponse[]>(CARDS_URI)
      return convertCardsFromApiToView(response.data)
    } catch (error) {
      // TODO handle errors
    }
  }, [convertCardsFromApiToView])

  /**
   *
   * @param card
   */
  const createCard = React.useCallback(
    async (card: Card): Promise<Card | undefined> => {
      try {
        const response = await API.post<CardResponse>(
          CARDS_URI,
          convertCardFromViewToApi(card)
        )

        return convertCardFromApiToView(response.data)
      } catch (error) {
        // TODO handle errors
      }
    },
    [convertCardFromApiToView, convertCardFromViewToApi]
  )

  /**
   *
   * @param id
   */
  const removeCard = React.useCallback(
    async (id: string) => {
      try {
        const response = await API.delete<CardResponse[]>(`${CARDS_URI}/${id}`)
        return convertCardsFromApiToView(response.data)
      } catch (error) {
        // TODO handle erros
      }
    },
    [convertCardsFromApiToView]
  )

  /**
   *
   */
  const updateCard = React.useCallback(
    async (card: Card): Promise<Card | undefined> => {
      try {
        const response = await API.put<CardResponse>(
          `${CARDS_URI}/${card.id}`,
          convertCardFromViewToApi(card)
        )
        return convertCardFromApiToView(response.data)
      } catch (error) {
        // TODO handle errors
        console.error(error)
      }
    },
    [convertCardFromApiToView, convertCardFromViewToApi]
  )

  return {
    getCards,
    createCard,
    removeCard,
    updateCard,
  }
}
