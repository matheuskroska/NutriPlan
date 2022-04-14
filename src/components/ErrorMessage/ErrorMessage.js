import React from 'react'
import { StyledError, StyledError2 } from './ErrorMessage.elements'

export const ErrorMessage = (props) => {
  return (
    <>
      <StyledError visibility={props.visibility}>{props.children}</StyledError>
    </>
  )
}