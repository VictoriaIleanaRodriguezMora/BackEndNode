
// Normalizr
const { normalize, schema, denormalize } = require('normalizr')
// Normalizr
const express = require('express')
const app = express()


// fakerGenerator - generateURL
const { percentageCalculator, generateURL } = require("../FAKER/utilitiesFAKER.js")

// Mongo CHAT
const ChatMongo = require('../DAOS/Chat/ClassMongoChat.js')
const schemaChat = require('../models/schemaChat.js')
const ChatMongoDB = new ChatMongo(schemaChat)
// Mongo CHAT

// Mongo PRODS
const MongoProds = require('../DAOS/Chat/ClassMongoChat.js')
const schemaProds = require('../models/schemaProds.js')
const ProdsMongoDB = new MongoProds(schemaProds)
// Mongo PRODS

async function getMySQLProds() {
    let newSyncProductsMySQL = await ProdsMongoDB.getAll()
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

async function getTheNumber() {
    finalNumbersNormalized = await schemasNormalizr()
    return finalNumbersNormalized
}

async function chatPage(data) {
    await ChatMongoDB.save(data)
    chatNormalized = await normalizarMensajes()
    const FINALchatNormalized = normalize(chatNormalized, [messageSchema])
    const finalNumbersNormalized2 = [FINALchatNormalized]
    // io.sockets.emit('chatPage', await finalNumbersNormalized2)
}

async function products(dataProds) {
    await ProdsMongoDB.save(dataProds)
    let newSyncProductsMySQL = await getMySQLProds()
    console.log(newSyncProductsMySQL);
    // io.sockets.emit('products', newSyncProductsMySQL)
}


// WEBSOCKETS

module.exports = {
    getMySQLProds,
    normalizarMensajes,
    generateURL,
    finalNumbersNormalized,
    ChatMongoDB,
    chatPage,
    products,
    getTheNumber
}