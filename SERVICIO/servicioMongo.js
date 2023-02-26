const ContainerMongo = require("../DAOS/MainContainers/ContainerMongo")

// UsuarioSchemaApp
const UsuarioSchemaApp = require("../models/schemaUsuariosApp")
const MongoUsersInstance = new ContainerMongo(UsuarioSchemaApp)
// UsuarioSchemaApp

// CarritosSchema
const CarritosSchema = require("../models/schemaCarritos")
const MongoCarritosInstance = new ContainerMongo(CarritosSchema)
// CarritosSchema

async function findByUsername__MongoService(req, res) {
    const { username, password } = req.user;

    const userFindByUsername = await MongoUsersInstance.getByUsername(username)

    const { phone, adress, age, avatar, gmail } = await userFindByUsername[0]

    const user = { username, password, phone, adress, age, avatar, gmail };

    return user
}



module.exports = {
    findByUsername__MongoService
}