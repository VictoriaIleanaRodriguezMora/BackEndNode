const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const schemaChat = new mongoose.Schema(
  {
    // nombre: { type: String, require: true },
    mensaje: { type: String, require: true },
    fechaParsed: { type: String, require: true },
  },
  { versionKey: false },
)

module.exports = mongoose.model('mensajes', schemaChat)
