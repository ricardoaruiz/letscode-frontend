import { CardValues } from 'components/Card/types'
import { Card } from '../../services/useCard/types'

export type LaneProps = {
  title: string
  cards: Card[]
  onSave: (card: CardValues) => void
  onDeleteCard: (id: string) => void
  onForwardCard: (id: string) => void
  onBackwardCard: (id: string) => void
}
