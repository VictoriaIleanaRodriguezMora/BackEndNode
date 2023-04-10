const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const schemaCarritos = new mongoose.Schema(
  {
    title: { type: String, require: true },
    date: { type: String, require: true },
    products: [
      {
       
      },
    ],
  },
  { versionKey: false },
)

module.exports = mongoose.model('carritos', schemaCarritos)
