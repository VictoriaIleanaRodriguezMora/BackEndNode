// File Sytem
const ProductsDaoFileSystem = require('./Products/FileSystemProducts.js')
const CarritosDaoFileSystem = require('./Carritos/FirebaseCarritos.js')

//  Mongo
const ProductsDaoMongo = require('./Products/MongoProducts.js')
const CarritosDaoMongo = require('./Carritos/MongoCarritos.js')

// Firebase
const ProductsDaoFirebase = require('./Products/FirebaseProducts.js')
const CarritosDaoFirebase = require('./Carritos/FirebaseCarritos')

module.exports = {
  // File Sytem
  ProductsDaoFileSystem,
  CarritosDaoFileSystem,

  // Mongo
  ProductsDaoMongo,
  CarritosDaoMongo,

  // Firebase
  ProductsDaoFirebase,
  CarritosDaoFirebase,
}
