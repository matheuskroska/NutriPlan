import { CheckCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'
import { StyledButton } from '../Button/Button.elements'
import { Translator } from '../I18n'
import { ModalButtonsWrapper, ModalContainer, ModalContent, ModalTitle, ModalWrapper } from './ModalMessage.elements'

export const ModalMessage = ({ success, children, confirm, func, setConfirmation, type }) => {
    
    
    const handleClick = (opt) => {  
        func(!success);
        if (confirm) {
            func(success);
            setConfirmation(opt, type);
        }
    } 

  return (
      <>
        <ModalContainer onClick={handleClick}>
              <ModalWrapper>
                  
                <ModalTitle>
                    {!!success ? (
                        <>
                            <CheckCircledIcon/> <Translator path="msgSuccess"/>
                        </>
                    ) : (
                        <>
                            <ExclamationTriangleIcon/> <Translator path="msgWarning"/>
                        </>
                    )}
                </ModalTitle>
                  <ModalContent>{children}</ModalContent>
                  {!!confirm ? (
                      <>
                        <ModalButtonsWrapper>
                            <StyledButton onClick={() => handleClick(true)} primary><Translator path="Sim" /></StyledButton>  
                            <StyledButton secondary onClick={() => handleClick(false)} primary><Translator path="Não" /></StyledButton> 
                        </ModalButtonsWrapper>
                    </>
                     
                  ) : (
                    <>
                        <StyledButton onClick={handleClick} primary><Translator path="ok" /></StyledButton> 
                    </>
                  )
                  }
                          
                  
                  
            </ModalWrapper>
        </ModalContainer>
      </>
    
  )
}
