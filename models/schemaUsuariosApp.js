const mongoose = require("mongoose");
mongoose.set('strictQuery', false)


const UsuarioSchemaApp = new mongoose.Schema({
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    gmail: { type: String, required: true, max: 100 },
    phone: { type: String, required: true, max: 100 },
    age: { type: String, required: true, max: 100 },
    adress: { type: String, required: true, max: 100 },
    avatar: { type: String, required: true, max: 100 },

},
    { versionKey: false },);

/* module.exports =  mongoose.model("usuarios_app", UsuarioSchemaApp); */
const UsuarioModel = mongoose.model("usuarios_app", UsuarioSchemaApp);

async function getUsuariosModel() {
    return await UsuarioModel.find({})
}
module.exports = { getUsuariosModel, UsuarioModel }


/* 
mongoose ORM, te permite hacer de todo
si el modelo de mongoose  tiene que conectarse a 2 bases de datos, que haces?

si cambias de base de datos, que capa hay que tocar. 
El modelo

pero si no usas DAO, tenes que cambiar el servicio tambien
DEBERIA cambiar solo el modelo, pero sin DAO, no se puede

y la persistencia?


*/