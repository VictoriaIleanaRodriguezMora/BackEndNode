const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const schemaChat = new mongoose.Schema(
  {
    author: {
      id: { type: String },
      nombre: { type: String },
      apellido: { type: String },
      edad: { type: String },
      alias: { type: String },
      avatar: { type: String },
    },
    text: { type: String, require: false },
    fechaParsed: { type: String, require: false },
  },
  { versionKey: false },
)

module.exports = mongoose.model('mensajes', schemaChat)
