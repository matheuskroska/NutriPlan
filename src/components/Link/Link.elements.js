import styled, {css} from 'styled-components/macro'
import { Link } from 'react-router-dom';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

const cssLink = css`
    font-family: 'Raleway',sans-serif;
    font-weight: 600;
    font-size: 1.4em;
    align-items: center;
    justify-content: center;
    display: flex;
    gap: 0 10px;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`

export const StyledLink = styled(Link)`
    ${cssLink};
    ${props => props.header &&
    css`
      color: var(--font-dark);
    `};
    ${props => props.menu &&
    css`
      font-size: 1em;
      color: var(--font-dark);
    `};
    ${props => props.selected &&
    css`
      color: var(--font-soft);
    `};
    ${props =>
    props.edit &&
    css`
      svg:hover path {
        fill-rule:nonzero;
        /* fill: var(--primary); */
      }
    `};
    ${props =>
    props.css &&
    css`
        font-weight: 400;
      color: var(--font-soft);
    `};
`

export const StyledRadixLink = styled(ToggleGroupPrimitive.Item)`
    ${cssLink};
    color: var(--font-dark);
    background-color: var(--primary);
    &:hover{ background-color: var(--tertiary);color: var(--font-soft) }
    &:hover a{color: var(--font-soft) }
    &[data-state=on] { background-color: var(--tertiary); color: var(--font-soft)}
    &[data-state=on] a {color: var(--font-soft)}
    &:focus { position: relative}


    ${props =>
    props.edituserbuttons &&
    css`
      height: 35px;
      border: 0;
      width: 100%;
      background-color: transparent;
      font-weight: 500;
      margin-bottom: 5px;
      font-size: 1.6em;
      &:hover { background-color: rgb(111 140 67 / 90%);color: var(--font-soft);text-decoration:none;cursor: pointer; }
      &[data-state=on] { background-color: rgb(111 140 67 / 90%); color: var(--font-soft)}
      &:focus { position: relative}

    `};
`