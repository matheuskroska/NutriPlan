import React from 'react'
import {StyledLink} from './Link.elements'

export const Link = (props) => {
  return (
    <StyledLink to={props.to}>{props.children}</StyledLink>
  )
}
