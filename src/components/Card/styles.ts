import styled, { css } from 'styled-components'
import { lighten } from 'polished'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.4);
    background-color: ${lighten(0.79, theme.colors.black)};
  `};
`

const Title = css`
  ${({ theme }) => css`
    font-size: 1.8rem;
    font-weight: 700;
    border-bottom: 1px solid ${theme.colors.black};
    padding-bottom: 10px;
  `};
`

export const ViewTitle = styled.h3`
  position: relative;
  text-align: center;

  ${Title}

  & .edit-button {
    position: absolute;
    right: 0px;
  }
`

const Content = css`
  margin-top: 20px;
  font-size: 1.4rem;
  max-height: 150px;
  min-height: 100px;
  resize: none;
`

export const ViewContent = styled.div`
  ${Content}
  overflow-y: auto;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const InputTitle = styled.input`
  ${({ theme }) => css`
    ${Title}
    outline: none;
    padding-bottom: 0;
    border: 1px solid transparent;
    padding: 5px;
    border-radius: 4px;
    font-family: 'Roboto', sans-serif;

    &:focus {
      border: 1px solid ${theme.colors.primary};
    }
  `};
`

export const InputContent = styled.textarea`
  ${({ theme }) => css`
    ${Content}
    outline: none;
    min-height: 100px;
    border: 1px solid lightgray;
    padding: 5px;
    border-radius: 4px;
    font-family: 'Roboto', sans-serif;

    &:focus {
      border: 1px solid ${theme.colors.primary};
    }
  `};
`

export const Actions = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 20px;
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid ${theme.colors.black};
  `};
`
