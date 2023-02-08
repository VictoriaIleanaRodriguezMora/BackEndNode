const { PetitionKNEX } = require('../petitionKNEX')
const { optionsSQLite3 } = require('../../options/options')
const productsMySQL = new PetitionKNEX(optionsSQLite3, 'products')
// productsMySQL.createTableProds() // This creates the table PRODUCTS