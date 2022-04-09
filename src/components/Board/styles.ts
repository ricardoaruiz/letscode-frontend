import styled from 'styled-components'
import media from 'styled-media-query'

import { Wrapper as Header } from '../Header/styles'

export const Main = styled.main`
  height: 100vh;
  display: grid;
  grid-template-rows: [header] 80px [content] auto;
  grid-template-columns: 1fr;

  ${Header} {
    grid-row: header;
    grid-column: 1;
  }

  ${media.greaterThan('medium')`
    grid-template-columns: [todo] 1fr [doing] 1fr [done] 1fr;

    ${Header} {
      grid-column: 1 / 4;
    }

  `}
`
