const { DAO__Users, DAO__Prods, DAO__Cart, DAO__Orders } = require("../PERSISTENCIA/DAOs/main__daos")

async function findByUserName(username) {
    const userFound = await DAO__Users.getByUsername(username)
    return userFound
}

async function saveCart(toSave) {
    return await DAO__Cart.saveCart(toSave)
}

async function saveUser(user) {
    return await await DAO__Users.saveUser(user)
}

async function saveOrders(order) {
    return await DAO__Orders.saveOrder(order)
}

module.exports = {
    findByUserName,
    saveCart,
    saveUser,
    saveOrders
}