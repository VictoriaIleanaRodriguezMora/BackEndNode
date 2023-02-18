const mongoose = require("mongoose");
mongoose.set('strictQuery', false)


const UsuarioSchemaApp = new mongoose.Schema({
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    phone: { type: String, required: true, max: 100 },
    age: { type: String, required: true, max: 100 },
    adress: { type: String, required: true, max: 100 },
    avatar: { type: String, required: true, max: 100 },

},
    { versionKey: false },);

module.exports =  mongoose.model("usuarios_app", UsuarioSchemaApp);
