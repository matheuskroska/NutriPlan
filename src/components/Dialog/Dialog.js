import React from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { StyledButton } from '../Button/Button.elements';
import { Fieldset, Flex, IconButton, Input, Label, StyledContent, StyledDescription, StyledOverlay, StyledTitle } from './Dialog.elements';

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

export const Dialog = () => (
    <DialogRoot>
        <DialogTrigger asChild>
            <StyledButton>Abrir Dialog</StyledButton>
        </DialogTrigger>
        <DialogContent >
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
            <Fieldset>
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
            </Fieldset>
            <Fieldset>
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
            </Fieldset>
            <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
                <DialogClose asChild>
                    <StyledButton variant="green">Save changes</StyledButton>
                </DialogClose>
            </Flex>
            <DialogClose asChild>
                <IconButton aria-label="Close">
                    <Cross2Icon />
                </IconButton>
            </DialogClose>
        </DialogContent>
    </DialogRoot>
);
