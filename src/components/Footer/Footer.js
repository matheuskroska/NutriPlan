import React, {useState, useEffect}  from 'react';
import { useLocation } from 'react-router-dom';
import {} from './Footer.elements'
import logo from '../../assets/images/logo.png';
import {FigmaLogoIcon, GitHubLogoIcon, InstagramLogoIcon, DiscordLogoIcon} from '@radix-ui/react-icons'
import { FooterColSocial, FooterLogo, FooterWrapper,FooterContainer,FooterItem, FooterCol, FooterColItem, FooterColList, FooterColTitle } from './Footer.elements'
import { Translator } from '../I18n';

export const Footer = () => {

    const [footerVisibility, setFooterVisibility] = useState(false)

    const currentPage  = () => {
        const location = useLocation();

        useEffect(() => {
            location.pathname !== "/" ? setFooterVisibility(false) : setFooterVisibility(true);
        }, [location])
    }

    currentPage()
    
    return (
            <FooterContainer>
                
                <FooterWrapper bgColor="rgb(111 140 67 / 90%)">
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
                        {(footerVisibility) ? (
                            <>
                                <FooterCol>
                                    <FooterColTitle><Translator path="about"/></FooterColTitle>
                                    <FooterColList>
                                        <FooterColItem><Translator path="bePartner"/></FooterColItem>
                                        <FooterColItem><Translator path="faq"/></FooterColItem>
                                        <FooterColItem><Translator path="contactUs"/></FooterColItem>
                                    </FooterColList>
                                </FooterCol>
                                <FooterCol>
                                    <FooterColTitle><Translator path="about"/></FooterColTitle>
                                    <FooterColList>
                                        <FooterColItem><Translator path="bePartner"/></FooterColItem>
                                        <FooterColItem><Translator path="faq"/></FooterColItem>
                                        <FooterColItem><Translator path="contactUs"/></FooterColItem>
                                    </FooterColList>
                                </FooterCol>
                                <FooterCol>
                                    <FooterColTitle><Translator path="about"/></FooterColTitle>
                                    <FooterColList>
                                        <FooterColItem><Translator path="bePartner"/></FooterColItem>
                                        <FooterColItem><Translator path="faq"/></FooterColItem>
                                        <FooterColItem><Translator path="contactUs"/></FooterColItem>
                                    </FooterColList>
                                </FooterCol>
                            </>
                        ) : (
                            <>
                            </>
                        )}
                        
                    </FooterItem>
                </FooterWrapper>

                {(!footerVisibility) ? (
                    <>
                        <FooterWrapper bgColor="var(--primary)">
                            <FooterItem padding={"0 0 20px 0"}><Translator path="dev"/></FooterItem>
                        </FooterWrapper>
                    </>) : (
                        <>
                        </>
                    )}                
            </FooterContainer>
    )
}