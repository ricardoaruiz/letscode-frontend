import { Card } from '../../services/useCard/types'

export type LaneProps = {
  title: string
  cards: Card[]
  onDeleteCard: (id: string) => void
}
