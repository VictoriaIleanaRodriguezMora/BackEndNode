const {

    UsuarioSchemaApp,
    MongoUsersInstance,
    CarritosSchema,
    MongoCarritosInstance,
    schemaUsuariosPassport

} = require("../SERVICE/servicioSchemas")



async function findByUserName(username) {
    const userFound = await MongoUsersInstance.getByUsername(username)

    return userFound
}

async function saveCart(toSave) {
    return await MongoCarritosInstance.saveCart(toSave)
}

async function saveUser(user) {
    return await MongoUsersInstance.saveUser(user)
}


module.exports = {
    findByUserName,
    saveCart,
    saveUser
}