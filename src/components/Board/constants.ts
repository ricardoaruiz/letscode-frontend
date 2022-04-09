import { DynamicPath } from './types'

export const LANE_PATH: DynamicPath = {
  todo: { next: 'doing', back: '' },
  doing: { next: 'done', back: 'todo' },
  done: { next: '', back: 'doing' },
}
