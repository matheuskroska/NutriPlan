import React  from 'react';
import {} from './Footer.elements'
import logo from '../../assets/images/logo.png';
import {FigmaLogoIcon, GitHubLogoIcon, InstagramLogoIcon, DiscordLogoIcon} from '@radix-ui/react-icons'
import { FooterColSocial, FooterLogo, FooterWrapper,FooterContainer,FooterItem, FooterCol, FooterColItem, FooterColList, FooterColTitle } from './Footer.elements'

export const Footer = () => {
    return (
            <FooterContainer>
                <FooterWrapper bgColor="var(--secondary)">
                    <FooterItem >
                        
                    </FooterItem>
                </FooterWrapper>
                <FooterWrapper bgColor="var(--primary)">
                    <FooterItem >
                        <FooterCol>
                            <FooterLogo src={logo}></FooterLogo>
                            <FooterColSocial>
                                <FigmaLogoIcon/>
                                <GitHubLogoIcon/>
                                <InstagramLogoIcon/>
                                <DiscordLogoIcon/>
                            </FooterColSocial>
                        </FooterCol>
                        <FooterCol>
                            <FooterColTitle>Teste</FooterColTitle>
                            <FooterColList>
                                <FooterColItem>Sobre</FooterColItem>
                                <FooterColItem>Fale Conosco</FooterColItem>
                                <FooterColItem>História</FooterColItem>
                                <FooterColItem>Seja um parceiro</FooterColItem>
                            </FooterColList>
                        </FooterCol>
                        <FooterCol>
                            <FooterColTitle>Teste</FooterColTitle>
                            <FooterColList>
                                <FooterColItem>Sobre</FooterColItem>
                                <FooterColItem>Fale Conosco</FooterColItem>
                                <FooterColItem>História</FooterColItem>
                                <FooterColItem>Seja um parceiro</FooterColItem>
                            </FooterColList>
                        </FooterCol>
                        <FooterCol>
                            <FooterColTitle>Teste</FooterColTitle>
                            <FooterColList>
                                <FooterColItem>Sobre</FooterColItem>
                                <FooterColItem>Fale Conosco</FooterColItem>
                                <FooterColItem>História</FooterColItem>
                                <FooterColItem>Seja um parceiro</FooterColItem>
                            </FooterColList>
                        </FooterCol>
                    </FooterItem>
                </FooterWrapper>
                <FooterWrapper bgColor="var(--tertiary)">
                    <FooterItem >
                        
                    </FooterItem>
                </FooterWrapper>
            </FooterContainer>
    )
}