// Normalizr
const { normalize, schema, denormalize } = require('normalizr')
// Normalizr
const express = require('express')

// fakerGenerator - generateURL
const { generateURL, percentageCalculator } = require("..//FAKER/utilitiesFAKER")

const { DAO__Prods, DAO__Chat } = require("../../PERSISTENCIA/DAOs/main__daos")

const { POST_Carritos__MongoService } = require("../servicio.mongo")

// LOG4JS 
const { log4jsConfigure } = require("../LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
// LOG4JS 

async function getMongoProds() {
    let newSyncProductsMySQL = await DAO__Prods.getAll()
    return newSyncProductsMySQL
}
// getMongoProds()


// WEBSOCKETS
// normalizarMensajes
async function normalizarMensajes() {
    const MongoCHAT = await DAO__Chat.getAll()

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

    const FINALchatNormalized = await normalize(chatNormalized, [messageSchema])
    const FINALchatNormalizedDENORMALIZED = await denormalize(
        FINALchatNormalized.result,
        [messageSchema],
        FINALchatNormalized.entities,
    )

    // PORCENTAJE
    const cantNORMALIZED = await JSON.stringify(chatNormalized).length
    const cantDENORMALIZED = await JSON.stringify(FINALchatNormalizedDENORMALIZED)
        .length
    const percetageNrmld = await percentageCalculator(cantNORMALIZED, cantDENORMALIZED)
    // PORCENTAJE

    return finalNumbersNormalized = await [FINALchatNormalized, percetageNrmld]
}

async function getTheNumberNormalized() {
    finalNumbersNormalized = await schemasNormalizr()
    return await finalNumbersNormalized
}

async function chatPage(data) {
    await DAO__Chat.save(data)
    chatNormalized = await normalizarMensajes()
    const FINALchatNormalized = await normalize(chatNormalized, [messageSchema])
    const finalNumbersNormalized2 = await [FINALchatNormalized]
}

async function saveProds(dataProds) {
    await DAO__Prods.save(dataProds)
    let newSyncProductsMySQL = await getMongoProds()
}

async function websockets(io) {
    //  ---- NORMALIZR ---- NORMALIZR ----
    let chatNormalized = await normalizarMensajes()
    const authorSchema = new schema.Entity('authors', { idAttribute: 'id' })
    const messageSchema = new schema.Entity(
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

    const respuesta = [FINALchatNormalized, percetageNrmld]
    //  ---- NORMALIZR ---- NORMALIZR ----

    io.on('connection', async (socket) => {

        io.sockets.emit('chatPage', await respuesta)

        // -------- CHAT -------- 
        socket.on('mnsChat', async (data) => {
            await DAO__Chat.save(data)
            chatNormalized = await normalizarMensajes()
            const FINALchatNormalized = normalize(chatNormalized, [messageSchema])
            const respuesta = [FINALchatNormalized]


            io.sockets.emit('chatPage', await respuesta)
            // io.sockets.emit('chatPage', await THEFINALNORMALIZED)
        })

        // -------- CHAT -------- 

        // ------- PRODUCTS SOCKET --------
        let syncProductsMongo = await getMongoProds()
        io.sockets.emit('products', syncProductsMongo)
        socket.on('products', async (dataProds) => {
            await saveProds(dataProds)
            syncProductsMongo = await getMongoProds()
            io.sockets.emit('products', syncProductsMongo)
        })
        // ------- PRODUCTS SOCKET --------

        // ------- PRODUCTS SOCKET --------
        socket.emit('carritos', "|||||||||||||||||||||||||||||||||||")
        socket.on('carritos', async (dataCarts) => {
            await POST_Carritos__MongoService(dataCarts[0].carrito, dataCarts[0].gmail)
        })
        // ------- PRODUCTS SOCKET --------

        // ----------- FAKER - NORMALIZR -----------
        io.sockets.emit('fakerData', await generateURL())
        socket.on('fakerData', async (dataProds) => {
            io.sockets.emit('fakerData', await generateURL())
        })
        // ----------- FAKER - NORMALIZR -----------
    })
    // WEBSOCKETS
}



module.exports = {
    websockets
}