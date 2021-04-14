import {useEffect} from 'react';

import "./styles/chat.css"

function Chat(props) {
    
    useEffect(() => {
        const form = document.querySelector('.card');
        form.classList.add("hidden");
    })

    const displayMessages = props.chat.map(({ message }, index) => (
        <div key={index}>
            <h3>
                <span className="indices-text">{message}</span>
            </h3>
        </div>
    ))

    return(
        <div className="render-chat">
            {displayMessages}
        </div>
    )
}

export default Chat