let DAO__Prods = null;
let DAO__Users = null
let DAO__Cart = null
let DAO__Chat = null

let MODO = process.argv[2]


const { ProductsDaoMongo } = require("./Products/MongoProducts")
const modelProduct = require('../../models/schemaProds')

const { UsersDAOMongo } = require("./Users/MongoUsers")
const modelUser = require('../../models/schemaUsuariosApp')

const { CarritosDAOMongo } = require("./Carritos/DAO__Carritos")
const modelCart = require('../../models/schemaCarritos')

const { ChatDaoMongo } = require("./Chat/MongoChat")
const modelChat = require('../../models/schemaChat')


if (MODO == "prod") {
    DAO__Prods = new ProductsDaoMongo(modelProduct)
    DAO__Users = new UsersDAOMongo(modelUser)
    DAO__Cart = new CarritosDAOMongo(modelCart)
    DAO__Chat = new ChatDaoMongo(modelChat)
} else if (MODO == "dev") {
    DAO__Prods = new DAO__Memoria()
} else {
    throw 'No se indicó queDAO__Prodsfabricar'
}

module.exports = { DAO__Prods, DAO__Users, DAO__Cart, DAO__Chat }