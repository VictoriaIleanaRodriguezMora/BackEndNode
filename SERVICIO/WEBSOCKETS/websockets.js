// Normalizr
const { normalize, schema, denormalize } = require('normalizr')
// Normalizr
const express = require('express')

// fakerGenerator - generateURL
const { percentageCalculator, generateURL } = require("../../SERVICIO/FAKER/utilitiesFAKER.js")

const { DAO__Prods, DAO__Chat } = require("../../PERSISTENCIA/DAOs/main__daos")


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
    await DAO__Chat.save(data)
    chatNormalized = await normalizarMensajes()
    const FINALchatNormalized = normalize(chatNormalized, [messageSchema])
    const finalNumbersNormalized2 = [FINALchatNormalized]
    // io.sockets.emit('chatPage', await finalNumbersNormalized2)
}

async function saveProds(dataProds) {
    console.log("*****************************", dataProds);
    await DAO__Prods.save(dataProds)
    let newSyncProductsMySQL = await getMongoProds()
    // io.sockets.emit('products', newSyncProductsMySQL)
}


// WEBSOCKETS

module.exports = {
    getMongoProds,
    normalizarMensajes,
    generateURL,
    finalNumbersNormalized,
    DAO__Chat,
    chatPage,
    saveProds,
    getTheNumber
}