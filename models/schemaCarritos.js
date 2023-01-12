const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const schemaCarritos = new mongoose.Schema(
  {
    title: { type: String, require: false },
    price: { type: Number, require: false },
    thumbnail: { type: String, require: false },
    date: { type: String, require: false },
    products: [
      {
        code: { type: String },
        description: { type: String },
        photo: { type: String },
        name: { type: String },
        price: { type: Number },
        stock: { type: Number },
        timestamp: { type: String },
        id: { type: String },
      },
    ],
  },
  { versionKey: false },
)

module.exports = mongoose.model('carritos', schemaCarritos)
