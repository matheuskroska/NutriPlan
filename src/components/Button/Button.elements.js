import styled, {css} from "styled-components";
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

const cssButon = css`
    position: relative;
    border-radius: 5px;
    max-width: ${props => props.maxWidth ? props.maxWidth : "100%"};
    height: 35px;
    font-size: 1.3em;
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
    padding: ${props => props.hasIconRight ? "0 5px 0 15px" : (props.hasIconLeft ? "0 15px 0 5px" : "0 15px")};
    width: ${props => props.width || "100%"};
    font-family: inherit;
    margin: 0 auto;
    margin-top: ${props => props.marginTop ? props.marginTop : "0"};
    margin-left: ${props => props.mLeft};
`

export const StyledRadixToggleGroup = styled(ToggleGroupPrimitive.Root)`
    opacity: ${props => props.mState ? "1" : "0"};
    display: flex;
    justify-content: initial;
    width: 100%;
    height: ${props => props.height || ""};
    gap: 0 8px;
    align-items: center;
    flex-direction: ${props => props.flexdirection || "row"};
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
    props.secondary &&
    css`
      background-color: var(--secondary);
      color: var(--font-soft);
      &:hover {
        background-color: var(--primary);
        color: var(--font-dark);
        }
    `};

`