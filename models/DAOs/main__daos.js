let DAO = null;
let MODO = process.argv[2]
const { DAO__Mongo } = require("../DAOs/Containers/DAO__Mongo")
// const { DAO__Memoria } = require("../DAOs/Containers/DAO__Memoria")

const { ProductsDaoMongo } = require("./Products/MongoProducts")
const modelProduct = require('../schemaProds')

if (MODO == "prod") {
    DAO = new ProductsDaoMongo(modelProduct)
} else if (MODO == "dev") {
    DAO = new DAO__Memoria()
} else{
    throw 'No se indicó que DAO fabricar'
}

module.exports = { DAO }
