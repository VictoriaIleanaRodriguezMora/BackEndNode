const mongoose = require("mongoose");
mongoose.set('strictQuery', false)


const UsuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
});

const UsuariosSchema = mongoose.model("Usuarios", UsuarioSchema);
module.exports = UsuariosSchema;
