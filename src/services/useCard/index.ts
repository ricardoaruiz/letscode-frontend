import React from 'react'
import API from '../api-config'
import { Card, CardResponse, Cards, UseCard } from './types'

const CARDS_URI = '/cards'

export const useCard = (): UseCard => {
  /**
   *
   */
  const convertCard = React.useCallback((card: CardResponse): Card => {
    return {
      id: card.id,
      title: card.titulo,
      content: card.conteudo,
      list: card.lista,
    }
  }, [])

  /**
   *
   */
  const convertCards = React.useCallback((data: CardResponse[]) => {
    return data.reduce(
      (cards: Cards, card: CardResponse) => {
        cards[card.lista].push(convertCard(card))
        return cards
      },
      {
        todo: [],
        doing: [],
        done: [],
      }
    )
  }, [])

  /**
   *
   * @returns
   */
  const getCards = React.useCallback(async () => {
    try {
      const response = await API.get<CardResponse[]>(CARDS_URI)
      return convertCards(response.data)
    } catch (error) {
      // TODO handle errors
    }
  }, [convertCards])

  /**
   *
   * @param card
   */
  const createCard = React.useCallback(
    async (card: Card): Promise<Card | undefined> => {
      try {
        const response = await API.post<CardResponse>(CARDS_URI, {
          titulo: card.title,
          conteudo: card.content,
          lista: card.list,
        })

        return convertCard(response.data)
      } catch (error) {
        // TODO handle errors
      }
    },
    [convertCard]
  )

  /**
   *
   * @param id
   */
  const removeCard = React.useCallback(
    async (id: string) => {
      try {
        const response = await API.delete<CardResponse[]>(`${CARDS_URI}/${id}`)
        return convertCards(response.data)
      } catch (error) {
        // TODO handle erros
      }
    },
    [convertCards]
  )

  /**
   *
   */
  const updateCard = React.useCallback(
    async (card: Card): Promise<Card | undefined> => {
      try {
        const response = await API.put<CardResponse>(
          `${CARDS_URI}/${card.id}`,
          {
            id: card.id,
            titulo: card.title,
            conteudo: card.content,
            lista: card.list,
          }
        )
        return convertCard(response.data)
      } catch (error) {
        // TODO handle errors
        console.error(error)
      }
    },
    [convertCard]
  )

  return {
    getCards,
    createCard,
    removeCard,
    updateCard,
  }
}
