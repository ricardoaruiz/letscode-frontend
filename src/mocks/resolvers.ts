import { RestRequest, ResponseComposition, RestContext } from 'msw'
import jwt from 'jsonwebtoken'

export const LOGIN_SUCCESS = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext
) => {
  return res(
    ctx.status(200),
    ctx.text(
      jwt.sign({ user: 'lestcode' }, '123456', {
        expiresIn: '1h',
      })
    )
  )
}

export const LOAD_CARD_SUCCESS = (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext
) => {
  return res(
    ctx.status(200),
    ctx.json([
      {
        titulo: 'Task 01',
        conteudo: 'Conteúdo da task 01',
        lista: 'done',
        id: 'c71f4f88-a563-4b1b-b0c6-4b8a149d9d3a',
      },
      {
        titulo: 'Task 02',
        conteudo: 'Conteúdo da task 02',
        lista: 'doing',
        id: 'c71f4f88-a563-4b1b-b0c6-4b8a149d9d3b',
      },
      {
        titulo: 'Task 03',
        conteudo: 'Conteúdo da task 03',
        lista: 'done',
        id: 'c71f4f88-a563-4b1b-b0c6-4b8a149d9d3c',
      },
    ])
  )
}
