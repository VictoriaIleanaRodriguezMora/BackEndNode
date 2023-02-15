const { PetitionKNEX } = require('../petitionKNEX')
const { optionsMySQL } = require('../../options/options')
const productsMySQL = new PetitionKNEX(optionsMySQL, 'products')
// productsMySQL.createTableProds() // This creates the table PRODUCTS
module.exports = { productsMySQL }