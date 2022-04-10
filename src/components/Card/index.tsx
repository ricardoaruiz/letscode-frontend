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
  list,
  onDelete,
  onBack,
  onNext,
  onCancel,
  onSave,
}) => {
  const formRef = React.useRef<HTMLFormElement | null>(null)
  const titleRef = React.useRef<HTMLInputElement | null>(null)
  const contentRef = React.useRef<HTMLTextAreaElement | null>(null)

  const [isEditMode, setIsEditMode] = React.useState(() => (!id ? true : false))

  const handleEditButtonClick = React.useCallback(() => {
    setIsEditMode(true)
  }, [])

  const handleCancelButtonClick = React.useCallback(() => {
    id && setIsEditMode(false)
    onCancel && onCancel()
  }, [id, onCancel])

  const handleSaveButtonClick = React.useCallback(() => {
    const title = titleRef.current?.value
    const content = contentRef.current?.value

    if (!title || !content) return

    formRef.current?.reset()
    id && setIsEditMode(false)

    onSave({
      id,
      title,
      content,
      list,
    })
  }, [id, list, onSave])

  const handleDeleteButtonClick = React.useCallback(() => {
    id && onDelete && onDelete(id)
  }, [id, onDelete])

  const handleBackButtonClick = React.useCallback(() => {
    id && onBack && onBack(id)
  }, [id, onBack])

  const handleNextButtonClick = React.useCallback(() => {
    id && onNext && onNext(id)
  }, [id, onNext])

  React.useEffect(() => {
    if (isEditMode) {
      titleRef.current?.focus()
    }
  }, [isEditMode])

  return (
    <S.Wrapper>
      {!isEditMode && (
        <>
          <S.ViewTitle>
            {title}
            <S.ActionButton
              aria-label="edit"
              onClick={handleEditButtonClick}
              title="Edit"
              className="edit-button"
            >
              <Edit size={20} />
            </S.ActionButton>
          </S.ViewTitle>

          <S.ViewContent>{content}</S.ViewContent>

          <S.Actions>
            <S.ActionButton
              aria-label="back button"
              title="Move to preview lane"
              onClick={handleBackButtonClick}
            >
              <LeftArrow size={20} />
            </S.ActionButton>
            <S.ActionButton
              aria-label="remove button"
              title="Remove"
              onClick={handleDeleteButtonClick}
            >
              <Trash size={20} />
            </S.ActionButton>
            <S.ActionButton
              aria-label="next button"
              title="Move to next lane"
              onClick={handleNextButtonClick}
            >
              <RightArrow size={20} />
            </S.ActionButton>
          </S.Actions>
        </>
      )}

      {isEditMode && (
        <S.Form ref={formRef} onSubmit={(event) => event.preventDefault()}>
          <S.InputTitle
            aria-label="Type the title here"
            placeholder="Type the title here"
            defaultValue={title}
            ref={titleRef}
          />

          <S.InputContent
            aria-label="Type the content here"
            placeholder="Type the content here"
            defaultValue={content}
            ref={contentRef}
          />

          <S.Actions>
            <S.ActionButton
              type="button"
              aria-label="cancel edit button"
              title="Cancel operation"
              onClick={handleCancelButtonClick}
            >
              <Block size={20} />
            </S.ActionButton>

            <S.ActionButton
              type="button"
              aria-label="save edit button"
              title="Save operation"
              onClick={handleSaveButtonClick}
            >
              <Save size={20} />
            </S.ActionButton>
          </S.Actions>
        </S.Form>
      )}
    </S.Wrapper>
  )
}
