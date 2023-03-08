const { DAO__Prods } = require("../models/DAOs/main__daos")

async function getUsuariosService() {
    const usuarios = await DAO__Prods.getAll()
    return usuarios
}

module.exports = { getUsuariosService }