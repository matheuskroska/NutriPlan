import React, { useContext } from "react"
import UserModel from "../../db/UserModel"
import { AuthContext } from "../../firebase/Auth"
import slider2 from '../../assets/images/homeslider02.png';
import slider3 from '../../assets/images/homeslider03.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../../components";
import { CardImg, CardSlider } from "../../components/Card/Card.elements";
import { StyledLink } from "../../components/Link/Link.elements";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Translator from "../../components/I18n/Translator";

export const Home = () => {

    const { currentUser } = useContext(AuthContext)

    if (!!currentUser) {
        if (currentUser.acesso === 0 && currentUser.ativo === false) {
            let userModel = new UserModel()
            userModel.logout()
        }
    }

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        cssEase: "linear"
    };

    return (
        <>
            <Card borderRadius={"5px"} bgColor={"transparent"} showTitle={"none"} maxWidth={"1280px"}>
                <Slider {...settings}>
                    <Card padding={"26px 14px"} borderRadius={"5px"} margin2={"10px"} showTitle={"none"}>
                        <CardSlider>
                            <StyledLink header to="#"><Translator path="hotMeals"/><ChevronDownIcon/></StyledLink>
                            <CardImg src={slider3} ></CardImg>
                        </CardSlider> 
                    </Card >
                    <Card padding={"26px 14px"} borderRadius={"5px"} margin2={"10px"} showTitle={"none"}>
                        <CardSlider>
                            <StyledLink header to="#"><Translator path="hotMeals"/><ChevronDownIcon/></StyledLink>
                            <CardImg src={slider2} ></CardImg>
                        </CardSlider>    
                    </Card>
                    <Card padding={"26px 14px"} borderRadius={"5px"} margin2={"10px"} showTitle={"none"}>
                        <CardSlider>
                            <StyledLink header to="#"><Translator path="hotMeals"/><ChevronDownIcon/></StyledLink>
                            <CardImg src={slider3} ></CardImg>
                        </CardSlider>    
                    </Card>
                    <Card padding={"26px 14px"} borderRadius={"5px"} margin2={"10px"} showTitle={"none"}>
                        <CardSlider>
                            <StyledLink header to="#"><Translator path="hotMeals"/><ChevronDownIcon/></StyledLink>
                            <CardImg src={slider2} ></CardImg>
                        </CardSlider>
                    </Card>
                    <Card padding={"26px 14px"} borderRadius={"5px"} margin2={"10px"} showTitle={"none"}>
                        <CardSlider>
                            <StyledLink header to="#"><Translator path="hotMeals"/><ChevronDownIcon/></StyledLink>   
                            <CardImg src={slider3} ></CardImg>
                        </CardSlider>
                    </Card>
                    <Card padding={"26px 14px"} borderRadius={"5px"} margin2={"10px"} showTitle={"none"}>
                        <CardSlider>
                            <StyledLink header to="#"><Translator path="hotMeals"/><ChevronDownIcon/></StyledLink>
                            <CardImg src={slider2} ></CardImg>
                        </CardSlider>
                    </Card>
                </Slider>
            </Card>
        </>
    )
}