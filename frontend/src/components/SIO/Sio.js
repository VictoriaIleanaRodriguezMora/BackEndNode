import React from 'react'
import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("/");

const Sio = () => {
    // const [faker, setFaker] = useState('')

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const receiveMessage = (message) => {
            setMessages([message, ...messages]);
        };

        socket.on("message", receiveMessage);

        return () => {
            socket.off("message", receiveMessage);
        };
    }, [messages]);

    console.log(messages);


    const handleSubmit = (event) => {
        event.preventDefault();
        const newMessage = {
            body: message,
            from: "Me",
        };
        setMessages([newMessage, ...messages]);
        setMessage("");
        socket.emit("message", newMessage.body);
    };



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Chat React</h1>
                <input
                    name="message"
                    type="text"
                    placeholder="Write your message..."
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    autoFocus
                />

                <ul>
                    {messages.map((message, index) => (
                        <li key={index} >
                            <b>{message.from}</b>:{message.body}
                        </li>
                    ))}
                </ul>
            </form>
        </div>
    );
}

export default Sio