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

module.exports = {
    findByUserName
}