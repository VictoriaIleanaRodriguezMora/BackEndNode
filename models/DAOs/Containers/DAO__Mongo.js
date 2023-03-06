const { UsuarioModel } = require(".././../schemaUsuariosApp")

class DAO__Mongo {
    async getUsuariosModel() {
        return await UsuarioModel.find({})
    }

}

module.exports = { DAO__Mongo }