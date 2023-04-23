const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const schemaOrders = new mongoose.Schema(
  {
    username: { type: String, require: true },
    price: { type: String, require: true },
    products: { type: Array, require: true },
    gmail: { type: String, require: true },
    date: { type: String, require: true },

  },
  { versionKey: false },
)

module.exports = mongoose.model('orders', schemaOrders)
