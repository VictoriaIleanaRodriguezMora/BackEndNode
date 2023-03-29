const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const schemaOrders = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    photo: { type: String, require: true },
    name: { type: String, require: true },
    username: { type: String, require: true },
    gmail: { type: String, require: true },
    date: { type: String, require: true },

  },
  { versionKey: false },
)

module.exports = mongoose.model('orders', schemaOrders)
