import React from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { StyledButton } from '../Button/Button.elements';
import { DialogWrapper, Fieldset, Flex, IconButton, Input, Label, StyledContent, StyledDescription, StyledOverlay, StyledTitle } from './Dialog.elements';
import DatePicker from "react-datepicker"
import { addDays, setHours, setMinutes } from 'date-fns';

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
        {/* <DialogTrigger asChild>
            <StyledButton>Abrir Dialog</StyledButton>
        </DialogTrigger>
        <DialogContent >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogDescription>Selecione um horário e um alimento.</DialogDescription>
            <Fieldset>
                <Label htmlFor="name">Horário</Label>
                <DatePicker
                    // selected={startDate}
                    onChange={addDays(new Date(), 1)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    minTime={setHours(setMinutes(addDays(new Date(), 1), 0), 8)}
                    maxTime={setHours(setMinutes(addDays(new Date(), 1), 30), 17)}
                    dateFormat="HH:mm"
                    placeholderText="Selecione um horário"
                    // withPortal
                />
            </Fieldset>
            <Fieldset>
                <Label htmlFor="food">Alimento</Label>
                <Input id="food" placeholder="Selecione um alimento" />
            </Fieldset>
            <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
                <DialogClose asChild>
                    <StyledButton primary variant="green">Save changes</StyledButton>
                </DialogClose>
            </Flex>
            <DialogClose asChild>
                <IconButton aria-label="Close">
                    <Cross2Icon />
                </IconButton>
            </DialogClose>
        </DialogContent> */}
    </DialogRoot>
);
