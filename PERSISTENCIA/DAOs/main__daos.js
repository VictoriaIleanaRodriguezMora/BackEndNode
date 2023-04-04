let DAO__Prods = null;
let DAO__Users = null
let DAO__Cart = null
let DAO__Chat = null
let DAO__Orders = null

let MODO = process.env.NODE_ENV

const { ProductsDaoMongo } = require("./Products/MongoProducts")
const modelProduct = require('../../models/schemaProds')

const { UsersDAOMongo } = require("./Users/MongoUsers")
const modelUser = require('../../models/schemaUsuariosApp')

const { CarritosDAOMongo } = require("./Carritos/DAO__Carritos")
const modelCart = require('../../models/schemaCarritos')

const { ChatDaoMongo } = require("./Chat/MongoChat")
const modelChat = require('../../models/schemaChat')

const { OrdersDaoMongo } = require("./Orders/Dao__Order")
const modelOrders = require('../../models/schemaOrders')

if (MODO == "production") {
    DAO__Prods = new ProductsDaoMongo(modelProduct)
    DAO__Users = new UsersDAOMongo(modelUser)
    DAO__Cart = new CarritosDAOMongo(modelCart)
    DAO__Chat = new ChatDaoMongo(modelChat)
    DAO__Orders = new OrdersDaoMongo(modelOrders)
} else if (MODO == "development") {
    DAO__Prods = new ProductsDaoMongo(modelProduct)
    DAO__Users = new UsersDAOMongo(modelUser)
    DAO__Cart = new CarritosDAOMongo(modelCart)
    DAO__Chat = new ChatDaoMongo(modelChat)
    DAO__Orders = new OrdersDaoMongo(modelOrders)
} else {
    throw 'No se indicó que DAO__Prods fabricar'
}

module.exports = { DAO__Prods, DAO__Users, DAO__Cart, DAO__Chat, DAO__Orders }
