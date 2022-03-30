import React from 'react'
import {StyledLink} from './Link.elements'

export const Link = (props) => {
  return (
    <StyledLink css={props.css} to={props.to}>{props.children}</StyledLink>
  )
}
