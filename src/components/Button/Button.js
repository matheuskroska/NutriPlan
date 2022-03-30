import React from 'react'
import { StyledButton } from './Button.elements'

export const Button = (props) => {
  return (
    <StyledButton>{props.children}</StyledButton>
  )
}
