// MySQL Products
const { PetitionKNEX } = require("../Classes/ClassKNEX") // CLASS KNEX

const { optionsMySQL } = require("../options/options")
const productsMySQL = new PetitionKNEX(optionsMySQL, "products")
// 1.
productsMySQL.createTableProds() // This creates the table PRODUCTS

// 2. Comentar 1. Y descomentar 2.
// productsMySQL.insert({
//     title: "title",
//     price: 555,
//     thumbnail: "https://"
// })


// SQLite3 - Messages
const { optionsSQLite3 } = require("../options/options")
const chatSQLite3 = new PetitionKNEX(optionsSQLite3, "messages")

// 1.
chatSQLite3.createTableChat() // This creates the table MESSAGES

// 2. Comentar 1. Y descomentar 2.
// chatSQLite3.insertCHAT({
//     email: "b",
//     message: "b",
//     fechaParsed: "f"
// })
