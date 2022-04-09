import React from 'react'

import {
  Edit,
  LeftArrow,
  RightArrow,
  Trash,
  Block,
  Save,
} from '@styled-icons/boxicons-regular'

import { CardProps } from './types'

import * as S from './styles'

export const Card: React.FC<CardProps> = ({
  id,
  title,
  content,
  onDelete,
  onBack,
  onNext,
  onSave,
}) => {
  const titleRef = React.useRef<HTMLInputElement | null>(null)
  const contentRef = React.useRef<HTMLTextAreaElement | null>(null)
  const [isEditMode, setIsEditMode] = React.useState(() => (!id ? true : false))

  const handleEditButtonClick = React.useCallback(() => {
    setIsEditMode(true)
  }, [])

  const handleCancelButtonClick = React.useCallback(() => {
    setIsEditMode(false)
  }, [])

  const handleSaveButtonClick = React.useCallback(() => {
    setIsEditMode(false)

    const title = titleRef.current?.value
    const content = contentRef.current?.value

    console.log(title, content)

    if (title && content) {
      onSave({
        id,
        title,
        content,
      })
    }
  }, [id, onSave])

  const handleDeleteButtonClick = React.useCallback(() => {
    id && onDelete(id)
  }, [id, onDelete])

  const handleBackButtonClick = React.useCallback(() => {
    id && onBack(id)
  }, [id, onBack])

  const handleNextButtonClick = React.useCallback(() => {
    id && onNext(id)
  }, [id, onNext])

  return (
    <S.Wrapper>
      {!isEditMode && (
        <>
          <S.ViewTitle>
            {title}
            <S.ActionButton
              aria-label="edit"
              onClick={handleEditButtonClick}
              className="edit-button"
            >
              <Edit size={20} />
            </S.ActionButton>
          </S.ViewTitle>

          <S.ViewContent>{content}</S.ViewContent>

          <S.Actions>
            <S.ActionButton
              aria-label="back button"
              onClick={handleBackButtonClick}
            >
              <LeftArrow size={20} />
            </S.ActionButton>
            <S.ActionButton
              aria-label="remove button"
              onClick={handleDeleteButtonClick}
            >
              <Trash size={20} />
            </S.ActionButton>
            <S.ActionButton
              aria-label="next button"
              onClick={handleNextButtonClick}
            >
              <RightArrow size={20} />
            </S.ActionButton>
          </S.Actions>
        </>
      )}

      {isEditMode && (
        <>
          <S.InputTitle
            id="title"
            aria-label="Type the title here"
            placeholder="Type the title here"
            defaultValue={title}
            ref={titleRef}
          />

          <S.InputContent
            id="content"
            aria-label="Type the content here"
            placeholder="Type the content here"
            defaultValue={content}
            ref={contentRef}
          />

          <S.Actions>
            <S.ActionButton
              aria-label="cancel edit button"
              onClick={handleCancelButtonClick}
            >
              <Block size={20} />
            </S.ActionButton>

            <S.ActionButton
              aria-label="save edit button"
              onClick={handleSaveButtonClick}
            >
              <Save size={20} />
            </S.ActionButton>
          </S.Actions>
        </>
      )}
    </S.Wrapper>
  )
}
