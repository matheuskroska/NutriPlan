import React, { useEffect } from 'react'
import { addResponseMessage, addUserMessage, Widget } from 'react-chat-widget'
import './index.css'

// import logo from '../../assets/images/user-test.png'

export const Chat = () => {

    const nutricionista = 'José'

    useEffect(() => {
        addResponseMessage('Welcome to this awesome chat!');
    }, []);
    
    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`, new Date());
        // Now send the message throught the backend API
        addResponseMessage('Oi');
        // addUserMessage('Oi')
    }

    return (
        <Widget
            handleNewUserMessage={handleNewUserMessage}
            // profileAvatar={logo}
            title="Canal direto"
            subtitle={`Conversa com nutricionista ${nutricionista}`}
            senderPlaceHolder="Mensagem"
            resizable={true}
            emojis={true}
        />
    )
}