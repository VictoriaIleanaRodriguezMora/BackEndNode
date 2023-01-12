const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const schemaProducts = new mongoose.Schema(
  {
    title: { type: String, require: false },
    price: { type: Number, require: false },
    thumbnail: { type: String, require: false },
    date: { type: String, require: false },
  },
  { versionKey: false },
)

module.exports = mongoose.model('products', schemaProducts)
