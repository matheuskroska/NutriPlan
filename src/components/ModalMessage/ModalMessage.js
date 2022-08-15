import { CheckCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import React from 'react'
import { StyledButton } from '../Button/Button.elements'
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
                            <CheckCircledIcon/> SUCESSO
                        </>
                    ) : (
                        <>
                            <ExclamationTriangleIcon/> ATENÇÃO
                        </>
                    )}
                </ModalTitle>
                <ModalContent>{props.children}</ModalContent>
                <StyledButton onClick={handleClick} primary>continuar</StyledButton>
            </ModalWrapper>
        </ModalContainer>
      </>
    
  )
}
