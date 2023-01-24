
// Normalizr
const { normalize, schema, denormalize } = require('normalizr')
// Normalizr
const express = require('express')
const app = express()
// SOCKET.IO
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer)
// SOCKET.IO

// fakerGenerator - generateURL
const { percentageCalculator, generateURL } = require("../FAKER/utilitiesFAKER.js")
// MySQL Products
const { productsMySQL } = require('../PetitionKNEX/productsMySQL/productsMySQL')

// Mongo CHAT
const ChatMongo = require('../DAOS/Chat/ClassMongoChat.js')
const schemaChat = require('../models/schemaChat.js')
const ChatMongoDB = new ChatMongo(schemaChat)
// Mongo CHAT

async function getMySQLProds() {
    let newSyncProductsMySQL = await productsMySQL.select("*")
    // console.log(newSyncProductsMySQL);
    return newSyncProductsMySQL
}
// getMySQLProds()



// WEBSOCKETS
// normalizarMensajes
async function normalizarMensajes() {
    const MongoCHAT = await ChatMongoDB.getAll()

    const arrFinalMsgs = []

    for (const message of MongoCHAT) {
        const mensajeNuevo = {
            author: {
                id: message.author.id,
                nombre: message.author.nombre,
                apellido: message.author.apellido,
                edad: message.author.edad,
                alias: message.author.alias,
                avatar: message.author.avatar,
            },
            text: message.text,
            fechaParsed: message.fechaParsed,
            _id: JSON.stringify(message._id),
        }
        arrFinalMsgs.push(mensajeNuevo)
    }
    return arrFinalMsgs
}
// normalizarMensajes

// const wbs = () => { return 
let finalNumbersNormalized
let messageSchema

async function schemasNormalizr() {
    let chatNormalized = await normalizarMensajes()
    const authorSchema = new schema.Entity('authors', { idAttribute: 'id' })
    messageSchema = new schema.Entity(
        'message',
        { author: authorSchema },
        { idAttribute: '_id' },
    )

    const FINALchatNormalized = normalize(chatNormalized, [messageSchema])
    const FINALchatNormalizedDENORMALIZED = denormalize(
        FINALchatNormalized.result,
        [messageSchema],
        FINALchatNormalized.entities,
    )

    // PORCENTAJE
    const cantNORMALIZED = JSON.stringify(chatNormalized).length
    const cantDENORMALIZED = JSON.stringify(FINALchatNormalizedDENORMALIZED)
        .length
    const percetageNrmld = percentageCalculator(cantNORMALIZED, cantDENORMALIZED)
    // PORCENTAJE

    return finalNumbersNormalized = [FINALchatNormalized, percetageNrmld]
}

async function some() {
     finalNumbersNormalized = await schemasNormalizr()
     console.log(finalNumbersNormalized);
     return finalNumbersNormalized
}

async function connectionSocket() {
    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", await schemasNormalizr());
    let chatNormalized = await normalizarMensajes()
    const authorSchema = new schema.Entity('authors', { idAttribute: 'id' })
    messageSchema = new schema.Entity(
        'message',
        { author: authorSchema },
        { idAttribute: '_id' },
    )

    const FINALchatNormalized = normalize(chatNormalized, [messageSchema])
    const FINALchatNormalizedDENORMALIZED = denormalize(
        FINALchatNormalized.result,
        [messageSchema],
        FINALchatNormalized.entities,
    )

    // PORCENTAJE
    const cantNORMALIZED = JSON.stringify(chatNormalized).length
    const cantDENORMALIZED = JSON.stringify(FINALchatNormalizedDENORMALIZED)
        .length
    const percetageNrmld = percentageCalculator(cantNORMALIZED, cantDENORMALIZED)
    // PORCENTAJE

    const finalNumbersNormalized = [FINALchatNormalized, percetageNrmld]
    //  ---- NORMALIZR ---- NORMALIZR ----

    console.log('SOCKET CONECTADO')
    // console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", finalNumbersNormalized);

}
let finalNumbersNormalized2
async function chatPage(data) {
    console.log("ññññññññññññ", data); // esto SÍ se muestra
    await ChatMongoDB.save(data)
    chatNormalized = await normalizarMensajes()
    const FINALchatNormalized = normalize(chatNormalized, [messageSchema])
    finalNumbersNormalized2 = [FINALchatNormalized]
    io.sockets.emit('chatPage', await finalNumbersNormalized2)
}

async function products(dataProds) {
    await productsMySQL.insert(dataProds)
    let newSyncProductsMySQL = await getMySQLProds()
    console.log(newSyncProductsMySQL);
    io.sockets.emit('products', newSyncProductsMySQL)
}

io.on('connection', async (socket) => {

    // -------- CHAT -------- 
    socket.on('testChat', async (data) => {
        await ChatMongoDB.save(data)
        chatNormalized = await normalizarMensajes()
        const FINALchatNormalized = normalize(chatNormalized, [messageSchema])
        const respuesta = [FINALchatNormalized]
        io.sockets.emit('chatPage', await respuesta)
    })
    // -------- CHAT -------- 

    // ------- PRODUCTS SOCKET --------
    let syncProductsMySQL = await getMySQLProds()
    socket.emit('products', syncProductsMySQL)

    socket.on('products', async (dataProds) => {
        await productsMySQL.insert(dataProds)

        let newSyncProductsMySQL = await getMySQLProds()
        console.log(newSyncProductsMySQL);
        io.sockets.emit('products', newSyncProductsMySQL)
    })
    // ------- PRODUCTS SOCKET --------

})

// }
// WEBSOCKETS



async function fakerNormalizr(socket) {
    console.log(" -------- fakerNormalizr -------- ");
    // ----------- FAKER - NORMALIZR -----------
    io.sockets.emit('prodsDesafio11', generateURL())
    socket.on('prodsDesafio11', async (dataProds) => {
        io.sockets.emit('prodsDesafio11 FAKER', generateURL())
    })
    // ----------- FAKER - NORMALIZR -----------
}
// console.log("ttttttttttttttttttttttttttttttttttt", finalNumbersNormalized, finalNumbersNormalized2);

module.exports = {
    getMySQLProds,
    normalizarMensajes,
    connectionSocket,
    fakerNormalizr,
    generateURL,
    finalNumbersNormalized,
    ChatMongoDB,
    chatPage,
    products,
    finalNumbersNormalized2,
    some
}