import { CheckCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import React from 'react'
import { StyledButton } from '../Button/Button.elements'
import { Translator } from '../I18n'
import { ModalContainer, ModalContent, ModalTitle, ModalWrapper } from './ModalMessage.elements'

export const ModalMessage = (props) => {
    
    const handleClick = () => {
        props.func(!props, props.success);
    } 

  return (
      <>
        <ModalContainer onClick={handleClick}>
            <ModalWrapper>
                <ModalTitle>
                    {!!props.success ? (
                        <>
                            <CheckCircledIcon/> <Translator path="msgSuccess"/>
                        </>
                    ) : (
                        <>
                            <ExclamationTriangleIcon/> <Translator path="msgWarning"/>
                        </>
                    )}
                </ModalTitle>
                <ModalContent>{props.children}</ModalContent>
                <StyledButton onClick={handleClick} primary><Translator path="ok"/></StyledButton>
            </ModalWrapper>
        </ModalContainer>
      </>
    
  )
}
