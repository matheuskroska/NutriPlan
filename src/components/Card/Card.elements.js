import styled, {css} from "styled-components";
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

export const StyledRadixToggleGroup = styled(ToggleGroupPrimitive.Root)`
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 0 8px;
    align-items: center;
` 
export const StyledRadixItem = styled(ToggleGroupPrimitive.Item)`
    display: 'flex';
    border: 0;
    outline: 0;
    font-family: inherit;
    font-size: 1.6em;
    height: 35px;
    width: 100%;
    border-radius: 15px;
    font-weight: 500;
    cursor: pointer;
    color: var(--font-dark);
    background-color: var(--primary);
    &:hover { background-color: var(--tertiary);color: var(--font-soft) }
    &[data-state=on] { background-color: var(--tertiary); color: var(--font-soft)}
    &:focus { position: 'relative'}
`

export const CardContainer = styled.div`
    width: 100%;
    max-width: 650px;
    margin: 0 auto;
    border-radius: 15px;
    position: relative;
`
export const CardInput = styled.input`
    border-radius: 15px;
    border: 1px solid #66A571;
    color: var(--font-dark);
    width: ${props => props.inputWidth || "100%"};
    height: 35px;
    font-size: 1.4em;
    font-weight: 400;
    outline: 0;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    padding: 0 20px;
    ::placeholder {
        color: rgb(74 77 38 / 50%);
    }
`

export const CardWrapper = styled.div`
    display: block;
    padding: 26px 50px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    background-color: rgb(111 140 67 / 90%);
    border-radius: 0 0 15px 15px;
`

export const CardItem = styled.div`
    display: flex;
    margin-bottom: 10px;
    gap: ${props => props.gap || "8px"};
    justify-content: ${props => props.justifyContent || "initial"};
`

export const CardItemContainer = styled.div`
    opacity: ${props => (props.show ? "1" : "0")};
    max-height: ${props => (props.show ? "600px" : "0")};
    overflow: hidden;
    transition: all 2s ease-in-out;
`

export const CardTitle = styled.h1`
    font-weight: bold;
    font-size: 2.6em;
    color: var(--font-dark);
    text-align: center;
    padding: 25px 0 25px 0;
    background-color: rgb(255 255 255 / 90%);
    border-radius: 15px 15px 0 0;
`
export const CardDescription = styled.h2`
    font-size: 1.8em;
    font-weight: 400;
    margin: 20px 0;
    color: var(--font-soft);
    min-width: fit-content;
    margin-right: 15px;
`

export const CardButton = styled.button`
    border-radius: 15px;
    background-color: var(--primary);
    max-width: 155px;
    height: 35px;
    font-size: 1.6em;
    font-weight: 500;
    color: var(--font-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px auto auto auto;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    cursor: pointer;
    appearance: none;
    outline: 0;
    border: 0;
    padding: 0;
    width: 100%;
    font-family: inherit;
`



