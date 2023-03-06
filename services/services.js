const { DAO__Final } = require("../models/schemaUsuariosApp")
/* al negocio/servicio no le tiene que importar la bdd */

async function getUsuariosService() {
    // este find, no va a funcionar aunque cambies solo el modelo a otra bd, pq eses find no va a existir.
    const usuarios = await DAO__Final.getUsuariosModel()
    return usuarios
}

module.exports = { getUsuariosService }