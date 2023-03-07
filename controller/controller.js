const { getUsuariosService } = require("../SERVICE/services")

async function getUsuariosController(req, res) {

    console.log("getUsuariosController");

    const usuarios = await getUsuariosService()
    return res.json(usuarios)
}
module.exports = { getUsuariosController }