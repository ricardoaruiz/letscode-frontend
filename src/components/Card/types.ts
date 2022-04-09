export type CardProps = {
  id?: string
  title: string
  content: string
  list?: string
  onBack: (id: string) => void
  onNext: (id: string) => void
  onDelete: (id: string) => void
  onSave: (card: CardValues) => void
}

export type CardValues = {
  id?: string
  title: string
  content: string
  list?: string
}
