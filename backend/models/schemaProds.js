const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const schemaProducts = new mongoose.Schema(
  {
    title: { type: String, require: true },
    price: { type: String, require: true },
    thumbnail: { type: String, require: true },
    categoria: { type: String, require: true },
    date: { type: String, require: true },
  },
  { versionKey: false },
)

module.exports = mongoose.model('products', schemaProducts)
