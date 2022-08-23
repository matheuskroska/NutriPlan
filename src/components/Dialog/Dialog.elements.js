import styled, { keyframes } from "styled-components";
import * as DialogPrimitive from '@radix-ui/react-dialog';

const overlayShow = keyframes`
  0% { opacity: 0 };
  100% { opacity: 1 }
`;

const contentShow = keyframes`
    0% { 
        opacity: 0;
        transform: 'translate(-50%, -48%) scale(.96)'
    };
    100% {
        opacity: 1;
        transform: 'translate(-50%, -50%) scale(1)'
    }
`;

export const DialogWrapper = styled.div`
    width: 100%;
    margin: ${props => props.margin || "0"};
`

export const StyledOverlay = styled(DialogPrimitive.Overlay)`
    background-color: #000000b3;
    position: fixed;
    inset: 0;
    height: 100vh;
    @media (prefers-reduced-motion: no-preference) {
        animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)
    }
`;

export const StyledContent = styled(DialogPrimitive.Overlay)`
    background-color: var(--font-soft);
    border-radius: 6px;
    box-shadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px';
    position: fixed;
    top: 50%;
    left: 50%;
    transform: 'translate(-50%, -50%)';
    width: 90vw;
    max-width: 450px;
    max-height: 85vh;
    padding: 25px;
    @media (prefers-reduced-motion: no-preference) {
        animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1),
    };
    :focus {
        outline: none
    }
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const StyledTitle = styled(DialogPrimitive.Title)`
    margin: 0;
    font-weight: 500;
    color: var(--font-dark);
    font-size: 17px;
`;

export const StyledDescription = styled(DialogPrimitive.Description)`
    margin: 10px 0 20px;
    color: var(--font-dark);
    font-size: 15px;
    line-height: 1.5px;
`;



export const Flex = styled.div`
    display: flex;
`;

export const IconButton = styled.button`
    all: unset;
    border-radius: 100%;
    height: 25px;
    width: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary);
    position: absolute;
    top: 10px;
    right: 10px;
    :hover { 
        background-color: var(--secondary);
        color: var(--font-soft);
        cursor: pointer;
    };
    :focus {
        box-shadow: 0 0 0 2px var(--secondary)
    }
`;

export const Fieldset = styled.fieldset`
    all: unset;
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 15px;
    position: relative;

    .searchResult {
        position: absolute;
        top: 50px;
        left: 0;
        background-color: #fff;
        z-index: 9999;
        max-height: 28vh;
        overflow: auto;

        li {
            padding: 10px;
            font-size: 14px;
            cursor: pointer;
        }

        li:hover {
            background-color: var(--secondary);
            color: #fff;
        }
    }

    .searchInput {
        position: relative;
    }
`;

export const Label = styled.label`
    font-size: 15px;
    color: 'var(--secondary)';
    width: 90px;
    text-align: 'right';
`;
export const Input = styled.input`
    all: unset;
    width: 100%;
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 0 10px;
    font-size: 15px;
    line-height: 1px;
    color: var(--secondary);
    box-shadow: 0 0 0 1px var(--secondary);
    height: 35px;
    :focus {
        box-shadow: 0 0 0 2px var(--secondary)
    }
`;