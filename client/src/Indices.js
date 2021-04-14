import {useRef, useState, useEffect} from 'react';
import io from 'socket.io-client';
import {
    Switch,
    Route,
} from "react-router-dom";

import Chat from './Chat';
import Tabs from "./Tabs";
import "./styles/indices.css";


function Indices() {
    const [ state, setState ] = useState({ message: "" });
	const [ chat, setChat ] = useState([]);
    const [showTyping, setShowTyping] = useState(true);

	const socketRef = useRef()

	useEffect(() => {
			socketRef.current = io.connect("http://localhost:4000")
			socketRef.current.on("message", ({ message }) => {
				setChat([ { message } ])
			})
			return () => socketRef.current.disconnect()
		},
		[chat]
	)

    function closeTyping() {
        setShowTyping(prev => !prev);
    }

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const { message } = state
		socketRef.current.emit("message", { message })
		e.preventDefault()
		setState({ message: "" })
	}

    return(
        <div>
            {
            showTyping
            ?
            <div className="card">
                <h1 className="room-name">Les Gardiens de la Magie</h1>
                {/* PARTIE AVEC ENVOI DES INDICES */}
                <div className="form">
                    <form className="indices-form" onSubmit={onMessageSubmit}>
                        <div className="message-field">
                            <label htmlFor="message">Entrez l'indice à envoyer ici : </label>
                            <textarea name="message"
                                onChange={(e) => onTextChange(e)}
                                value={state.message}
                                label="Message"
                            />
                        </div>
                        <button className="form-validation-button">Envoyer !</button>
                    </form>
                </div>
                <button className="close-button" onClick={() => closeTyping()}>X</button>

                {/* ONGLETS POUR GESTION DU JEU */}
                <Tabs> 
                    <div label="Tuto"> 
                        See ya later, <em>Alligator</em>! 
                    </div> 
                    <div label="Cartes"> 
                        After 'while, <em>Crocodile</em>! 
                    </div> 
                    <div label="Blasons"> 
                        Nothing to see here, this tab is <em>extinct</em>! 
                    </div> 
                </Tabs> 
            </div>
            :
            <button onClick={closeTyping}>Rentrer texte indice</button>
            }
            <Switch>
                <Route path="/indices">
                    <Chat chat={chat} />
                </Route>
            </Switch>
        </div>
    )
}

export default Indices;