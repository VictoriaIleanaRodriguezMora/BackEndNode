let usuarios = [{ id: 45, admin: true }, { id: 87, admin: false }]
class DAO__Memoria {
    async getUsuariosModel() {
        return usuarios
    }

}
module.exports = { DAO__Memoria }
