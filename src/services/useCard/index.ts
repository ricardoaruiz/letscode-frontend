import API from '../api-config'
import { Card, CardResponse, Cards, UseCard } from './types'

const CARDS_URI = '/cards'

export const useCard = (): UseCard => {
  /**
   *
   * @returns
   */
  const getCards = async () => {
    try {
      const response = await API.get<CardResponse[]>(CARDS_URI)

      return response.data.reduce(
        (cards: Cards, card: CardResponse) => {
          cards[card.lista].push({
            id: card.id,
            title: card.titulo,
            content: card.conteudo,
            list: card.lista,
          })
          return cards
        },
        {
          todo: [],
          doing: [],
          done: [],
        }
      )
    } catch (error) {
      // TODO handle errors
    }
  }

  /**
   *
   * @param card
   */
  const createCard = async (card: Card) => {
    try {
      await API.post(CARDS_URI, {
        titulo: card.title,
        conteudo: card.content,
        lista: card.list,
      })
    } catch (error) {
      // TODO handle errors
    }
  }

  return {
    getCards,
    createCard,
  }
}
