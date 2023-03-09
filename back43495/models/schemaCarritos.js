const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const schemaCarritos = new mongoose.Schema(
  {
    title: { type: String, require: false },
    date: { type: String, require: true },
    products: [
      {
        code: { type: String },
        description: { type: String },
        photo: { type: String },
        price: { type: String },
        timestamp: { type: String },
        id: { type: String },
      },
    ],
  },
  { versionKey: false },
)

module.exports = mongoose.model('carritos', schemaCarritos)
 