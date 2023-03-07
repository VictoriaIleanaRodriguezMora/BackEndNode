const { DAO } = require("../models/DAOs/main__daos")

async function getUsuariosService() {
    const usuarios = await DAO.getAll()
    return usuarios
}

module.exports = { getUsuariosService }