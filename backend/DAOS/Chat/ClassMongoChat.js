// {
//     author: {
//         id: "mail del usuario",
//         nombre: "nombre del usuario",
//         apellido: "apellido del usuario",
//         edad: "edad del usuario",
//         alias: "alias del usuario",
//         avatar: "url avatar (foto, logo) del usuario"
//     },
//     text: "mensaje del usuario"
// }

const ContainerMongo = require('../MainContainers/ContainerMongo')

class ChatMongo extends ContainerMongo {}

module.exports = ChatMongo
