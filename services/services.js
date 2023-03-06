const { DAO__Mongo } = require("../models/schemaUsuariosApp")
/* al negocio/servicio no le tiene que importar la bdd */
const DAO = new DAO__Mongo()

async function getUsuariosService() {
    // este find, no va a funcionar aunque cambies solo el modelo a otra bd, pq eses find no va a existir.
    const usuarios = await DAO.getUsuariosModel()
    return usuarios
}

module.exports = { getUsuariosService }