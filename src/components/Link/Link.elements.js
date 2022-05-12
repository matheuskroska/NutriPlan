import styled, {css} from 'styled-components'
import { Link } from 'react-router-dom';

const cssLink = css`
    font-size: 1.4em;
    font-weight: 600;
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
    ${props =>
    props.header &&
    css`
      color: var(--font-dark);
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