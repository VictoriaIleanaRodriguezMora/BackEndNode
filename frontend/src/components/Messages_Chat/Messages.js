// import { useEffect, useState } from "react";
import React from 'react'
import "../../SCSS/index.scss"
import { normalize, schema, denormalize } from 'normalizr';

import io from "socket.io-client";
const socket = io()

// const socket = io("/");
const Messages_Chat = () => {
    function denormalizarMensajes(ListMessages) {
        const authorSchema = new schema.Entity('authors', {
            idAttribute: 'id',
        })
        const messageSchema = new schema.Entity(
            'message',
            { author: authorSchema },
            { idAttribute: '_id' },
        )

        const denormalizedListMessages = denormalize(
            ListMessages.result,
            [messageSchema],
            ListMessages.entities,
        )
        return denormalizedListMessages
    }

    socket.on('chatPage', (data) => {
        // NORMALIZR
        console.log('CHAT NORMALIZADO', data)
        let denormalizado = denormalizarMensajes(data[0])
        let compressionData = data[1]
        console.log('CHAT DESNORMALIZADO0', denormalizado)
        // NORMALIZR
        const chatPage = document.querySelector('#chatPage')

        const p = denormalizado
            .map((e) => {
                return `
              <p> 
                <span class="email"> ${e.author.nombre} </span>
                <span class="date"> [${e.fechaParsed}] </span>
                <span class="message"> : ${e.text} </span>
                <span class="avatar"> : ${e.author.avatar} </span>
              <p/>
      
              `
            })
            .join(' ')

        chatPage.innerHTML = p
        const spanCompression = document.querySelector('#compression')
        spanCompression.textContent = compressionData
    })

    async function enviarMsg() {
        const email = document.getElementById('emailChat').value
        const nombre = document.getElementById('nombreChat').value
        const apellido = document.getElementById('apellidoChat').value
        const edad = document.getElementById('edadChat').value
        const alias = document.getElementById('aliasChat').value
        const avatar = document.getElementById('avatarChat').value
        const text = document.getElementById('messageChat').value
        const fechaParsed = new Date().toLocaleString('en-GB')

        const userChat = {
            author: {
                id: Math.random(),
                email: email,
                nombre: nombre,
                apellido: apellido,
                edad: edad,
                alias: alias,
                avatar: avatar,
            },
            text: text,
            fechaParsed: fechaParsed,
        }
        await socket.emit('testChat', userChat)
        // socket.emit("testChat", {
        //   id: email,
        //   nombre: nombre,
        //   apellido: apellido,
        //   edad: edad,
        //   alias: alias,
        //   avatar: avatar,
        //   text: text,
        // });
    }

    return (
        <div id="chatContainer">
            <h3> Centro de Mensajes - Compresión: <span id="compression"></span>%</h3>
            <form id="chatForm" onsubmit="enviarMsg(); return false">
                {/* <!-- mail --> */}
                <div>
                    <label>
                        E-mail
                        <input id="emailChat" value="email@gmail.com" type="text" placeholder="Email" required />
                    </label>
                </div>
                {/* <!-- nombre --> */}
                <div>
                    <label>
                        nombre
                        <input id="nombreChat" value="nombre" type="text" placeholder="Nombre" required /></label>
                </div>
                {/* <!-- apellido --> */}
                <div>
                    <label>
                        apellido
                        <input id="apellidoChat" value="apellido" type="text" placeholder="Apellido" required /></label>
                </div>
                {/* <!-- edad --> */}
                <div>
                    <label>
                        edad
                        <input id="edadChat" value="454" type="number" placeholder="Edad" required /></label>
                </div>
                {/* <!-- alias --> */}
                <div>
                    <label>
                        alias
                        <input id="aliasChat" value="alias" type="text" placeholder="Alias" required /></label>
                </div>
                {/* <!-- avatar --> */}
                <div>
                    <label>
                        avatar
                        <input id="avatarChat" value="avatar" type="text" placeholder="URL de avatar" required /></label>
                </div>
                <div id="chatPage"></div>
                <input id="messageChat" value="hola" type="text" placeholder="Mensaje" />
                <input type="submit" value="Enviar!" id="enviarChat" class="action-button" />
            </form>
        </div>
    )
}

export default Messages_Chat