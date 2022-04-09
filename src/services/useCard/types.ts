export type UseCard = {
  getCards: () => Promise<Cards | undefined>
  createCard: (card: Card) => Promise<void>
}

export type Card = {
  id?: string
  title: string
  content: string
  list: string
}

export type CardResponse = {
  id: string
  titulo: string
  conteudo: string
  lista: string
}

export type Cards = {
  [key: string]: Card[]
}
