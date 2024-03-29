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

async function saveProds(dataProds) {
    await DAO__Prods.save(dataProds)
    let newSyncProductsMySQL = await getMongoProds()
}

async function saveChat(data) {
    await DAO__Chat.save(data)
}

async function getChat(data) {
    await DAO__Chat.getAll(data)
}
getChat()

async function websockets(io) {
    io.on('connection', async (socket) => {

        // -------- CHAT -------- 

        let chatFileSync = await DAO__Chat.getAll()
        io.sockets.emit("chatPage", chatFileSync)

        socket.on("chatPage", async (dataChat) => {
            DAO__Chat.save(dataChat)
            chatFileSync = await DAO__Chat.getAll()
            io.sockets.emit("chatPage", chatFileSync)
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

        // ------- CARRITO SOCKET --------
        socket.on('carritos', async (dataCarts) => {

            console.log(dataCarts);
            // Cuando recibe info del front, se envia el mail
            if (dataCarts[0].carrito === null) {
                socket.emit("carritos", { info: null })
                console.log("IF IF IF IF IF IF IF");
            } else {
                console.log("ELSE ELSE ELSE ELSE ELSE ELSE ELSE");
                await POST_Carritos__MongoService(dataCarts[0].carrito, dataCarts[0].gmail)
            }
        })
        // ------- CARRITO SOCKET --------

    })
    // WEBSOCKETS
}



module.exports = {
    websockets
}