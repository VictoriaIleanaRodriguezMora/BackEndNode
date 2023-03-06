const { getUsuariosModel } = require("../models/schemaUsuariosApp")

 async function getUsuariosService() {
    // este find, no va a funcionar aunque cambies solo el modelo a otra bd, pq eses find no va a existir.
    const usuarios = await getUsuariosModel()
    return usuarios
}

module.exports = { getUsuariosService }