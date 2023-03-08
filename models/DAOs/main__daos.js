let DAO__Prods = null;
let DAO__Users = null

let MODO = process.argv[2]

const { DAO__Mongo } = require("../DAOs/Containers/DAO__Mongo")
// const { DAO__Memoria } = require("../DAOs/Containers/DAO__Memoria")

const { ProductsDaoMongo } = require("./Products/MongoProducts")
const modelProduct = require('../schemaProds')

const { UsersDAOMongo } = require("./Users/MongoUsers")
const modelUser = require('../schemaUsuariosApp')



if (MODO == "prod") {
    DAO__Prods = new ProductsDaoMongo(modelProduct)
    DAO__Users = new UsersDAOMongo(modelUser)
} else if (MODO == "dev") {
    DAO__Prods = new DAO__Memoria()
} else {
    throw 'No se indicó queDAO__Prodsfabricar'
}

module.exports = { DAO__Prods, DAO__Users }
