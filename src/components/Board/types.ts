export type List = 'todo' | 'doing' | 'done'

export type DynamicPath = {
  [key: string]: { next: string; back: string }
}
