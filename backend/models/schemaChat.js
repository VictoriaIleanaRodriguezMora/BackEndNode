const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const schemaChat = new mongoose.Schema(
  {
    author: {
      id: { type: String, require: true },
      nombre: { type: String, require: true },
      apellido: { type: String, require: true },
      edad: { type: String, require: true },
      alias: { type: String, require: true },
      avatar: { type: String, require: true },
    },
    text: { type: String, require: true },
    fechaParsed: { type: String, require: true },
  },
  { versionKey: false },
)

module.exports = mongoose.model('mensajes', schemaChat)
