import React from 'react'
import { useTranslation } from 'react-i18next'
import { BRFlag, USFlag } from '../../assets'
import { Flag, FlagContainer, StyledFlag } from './Flag'

const I18n = () => {
    const { i18n } = useTranslation()

    function handleChangeLanguage(language) {
        i18n.changeLanguage(language) // Trocando o idioma na chamada da função
    }

 
    const selectedLanguage = i18n.language // Idioma selecionado
    return (
        <FlagContainer>
                    <Flag
                    image={BRFlag}
                    isSelected={selectedLanguage === 'pt-BR'} // Verifica o idioma escolhido
                    onClick={() => handleChangeLanguage('pt-BR')} // Troca o idioma para pt-BR
                    width="20"
                    height="20"/>
                
                    <Flag
                    image={USFlag}
                    isSelected={selectedLanguage === 'en-US'} // Verifica o idioma escolhido
                    onClick={() => handleChangeLanguage('en-US')} // Troca o idioma para en-US
                    width="20"
                    height="20"/>   
        </FlagContainer>
    )
}

export default I18n