import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { DialogWrapper, StyledContent, StyledDescription, StyledOverlay, StyledTitle } from './Dialog.elements';

function Content({ children, ...props }) {
    return (
    <DialogPrimitive.Portal>
        <StyledOverlay />
        <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
    );
}

// Exports
export const DialogRoot = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = DialogPrimitive.Close;

export const Dialog = (props) => (
    <DialogRoot>
        <DialogWrapper> 
            {props.children}
        </DialogWrapper>
    </DialogRoot>
);
