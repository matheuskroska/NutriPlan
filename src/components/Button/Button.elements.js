import styled, {css} from "styled-components";
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

const cssButon = css`
    border-radius: 15px;
    max-width: 155px;
    height: 35px;
    font-size: 1.6em;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    cursor: pointer;
    appearance: none;
    outline: 0;
    border: 0;
    gap: 0 10px;
    padding: ${props => props.hasIcon ? "0 5px 0 15px" : "0 15px"};
    width: 100%;
    font-family: inherit;
    margin: 0 auto;
`

export const StyledRadixToggleGroup = styled(ToggleGroupPrimitive.Root)`
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 0 8px;
    align-items: center;
` 

export const StyledRadixButton = styled(ToggleGroupPrimitive.Item)`
    ${cssButon};
    color: var(--font-dark);
    background-color: var(--primary);
    &:hover { background-color: var(--tertiary);color: var(--font-soft) }
    &[data-state=on] { background-color: var(--tertiary); color: var(--font-soft)}
    &:focus { position: relative}
`


export const StyledButton = styled.button`
    ${cssButon};
    ${props =>
    props.primary &&
    css`
      background-color: var(--primary);
      color: var(--font-dark);
      &:hover {
    background-color: var(--tertiary);
    color: var(--font-soft);
        }
    `};
    ${props =>
    props.secundary &&
    css`
      background-color: var(--secundary);
      color: var(--font-soft);
      &:hover {
        background-color: var(--primary);
        color: var(--font-dark);
        }
    `};

`


