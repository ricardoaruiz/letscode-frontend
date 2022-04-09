import { Card } from '../../services/useCard/types'

export type LaneProps = {
  title: string
  cards: Card[]
  onDeleteCard: (id: string) => void
  onForwardCard: (id: string) => void
  onBackwardCard: (id: string) => void
}
