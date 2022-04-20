import React from 'react'
import { StyledError } from './ErrorMessage.elements'

export const ErrorMessage = (props) => {
  return (
    <>
      <StyledError>{props.children}</StyledError>
    </>
  )
}