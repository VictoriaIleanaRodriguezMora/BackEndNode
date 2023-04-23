const dotenv = require('dotenv').config()

let DAO__Prods = null;
let DAO__Users = null
let DAO__Cart = null
let DAO__Chat = null
let DAO__Orders = null

let MODO = process.env.NODE_ENV

// Mongo   
const { ProductsDaoMongo } = require("./Products/MongoProducts")
const modelProduct = require('../../models/schemaProds')

const { UsersDAOMongo } = require("./Users/MongoUsers")
const modelUser = require('../../models/schemaUsuariosApp')

const { ChatDaoMongo } = require("./Chat/MongoChat")
const modelChat = require('../../models/schemaChat')

const { OrdersDaoMongo } = require("./Orders/Dao__Order")
const modelOrders = require('../../models/schemaOrders')
// Mongo 

// Memoria
const { DAO__Memoria } = require("./Containers/DAO__Memoria")
const prodFile = new DAO__Memoria("./ejercicio.json")

const Escuadra = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    id: 1
}

prodFile.save(Escuadra)


// Memoria

if (MODO == "production") {
    DAO__Prods = new ProductsDaoMongo(modelProduct)
    DAO__Users = new UsersDAOMongo(modelUser)
    DAO__Chat = new ChatDaoMongo(modelChat)
    DAO__Orders = new OrdersDaoMongo(modelOrders)
} else if (MODO == "development") {
    DAO__Prods = new ProductsDaoMongo(modelProduct)
    DAO__Users = new UsersDAOMongo(modelUser)
    DAO__Chat = new ChatDaoMongo(modelChat)
    DAO__Orders = new OrdersDaoMongo(modelOrders)
} else {
    throw 'No se indicó que DAO__Prods fabricar'
}

module.exports = { DAO__Prods, DAO__Users, DAO__Chat, DAO__Orders }