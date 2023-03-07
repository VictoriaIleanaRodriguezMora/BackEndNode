const ContainerMongo = require("../DAOS/MainContainers/ContainerMongo")

// UsuarioSchemaApp
const UsuarioSchemaApp = require("../models/schemaUsuariosApp")
const MongoUsersInstance = new ContainerMongo(UsuarioSchemaApp)
MongoUsersInstance.connectMDB()
// UsuarioSchemaApp

// CarritosSchema
const CarritosSchema = require("../models/schemaCarritos")
const MongoCarritosInstance = new ContainerMongo(CarritosSchema)
MongoCarritosInstance.connectMDB()
// CarritosSchema

// PASSPORTT
const schemaUsuariosPassport = require("../models/schemaUsuariosPassport")
// PASSPORTT


module.exports = {

    UsuarioSchemaApp,
    MongoUsersInstance,
    CarritosSchema,
    MongoCarritosInstance,
    schemaUsuariosPassport

}