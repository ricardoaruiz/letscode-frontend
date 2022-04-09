import React from 'react'

import { BoardProps } from './types'

const BoardContext = React.createContext({})
BoardContext.displayName = 'BoardContext'

export const BoardProvider: React.FC<BoardProps> = ({ children }) => {
  return <BoardContext.Provider value={{}}>{children}</BoardContext.Provider>
}

export const useBoard = () => {
  const context = React.useContext(BoardContext)

  if (!context) {
    throw new Error('userBoard must be used under BoardContext')
  }

  return context
}
