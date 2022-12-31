const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const schemaCarritos = new mongoose.Schema(
  {
    author: {
      id: { type: String },
      nombre: { type: String },
      apellido: { type: String },
      edad: { type: String },
      alias: { type: String },
      avatar: { type: String },
      email: { type: String },
      fechaParsed: { type: String },

    },
    text: { type: String, require: false },
  },
  { versionKey: false },
)

module.exports = mongoose.model('chats', schemaCarritos)
