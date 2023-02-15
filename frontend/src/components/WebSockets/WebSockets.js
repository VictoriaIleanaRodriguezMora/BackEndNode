import React from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket"
const client = new W3CWebSocket('ws://127.0.0.1:2000');

/* function componentDidMount() {
    client.onopen = () => {
        console.log('WebSocket Client Connected');
    };
}
componentDidMount() */

const WebSockets = () => {

    function onButtonClicked(value) {
        client.send(JSON.stringify({
            type: "message",
            msg: value,
        }));
    }

    function onButtonFAKER(value) {
        client.send(JSON.stringify({
            type: "fakerTEST",
            msg: value,
        }));
    }

    function componentDidMount() {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('got reply! ', dataFromServer);
        }

        client.onfakerTEST = (faker) => {
            const dataFromServer = JSON.parse(faker.data);
            console.log('FAKEEEEEEEEEER! ', dataFromServer);
        }

    }
    componentDidMount()



    return (
        <div>WebSockets
            <button onClick={() => onButtonClicked("Hello")} >Sennddn</button>
            <button onClick={() => onButtonFAKER("faker")} >FAKEEEEEEEEEER</button>

        </div>
    )

}
export default WebSockets