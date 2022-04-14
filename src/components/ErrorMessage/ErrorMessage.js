import React from 'react'
import { StyledError } from './ErrorMessage.elements'

export const ErrorMessage = (props) => {
  return (
    <>
      <StyledError visibility={props.visibility}>{props.children}</StyledError>
    </>
  )
}