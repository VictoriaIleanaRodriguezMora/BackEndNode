const { DAO__Users } = require("../models/DAOs/main__daos")
const { DAO__Prods } = require("../models/DAOs/main__daos")

async function findByUserName(username) {
    const userFound = await DAO__Users.getByUsername(username)

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