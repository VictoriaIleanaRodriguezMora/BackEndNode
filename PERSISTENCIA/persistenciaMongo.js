const {

    UsuarioSchemaApp,
    MongoUsersInstance,
    CarritosSchema,
    MongoCarritosInstance,
    schemaUsuariosPassport

} = require("../SERVICIO/servicioSchemas")



async function findByUserName(username) {
    const userFound = await MongoUsersInstance.getByUsername(username)

    return userFound
}

async function saveCart(toSave) {
MongoCarritosInstance.saveCart(toSave)
}

module.exports = {
    findByUserName,
    saveCart
}