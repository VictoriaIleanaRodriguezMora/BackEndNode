// File Sytem
const ProductsDaoFileSystem = require('./Products/FileSystemProducts')
const CarritosDaoFileSystem = require("./Carritos/FileSystemCarritos")

//  Mongo
const ProductsDaoMongo = require('./Products/MongoProducts')
const CarritosDaoMongo = require("./Carritos/MongoCarritos")

// Firebase
const ProductsDaoFirebase = require('./Products/FireBaseProducts')
const CarritosDaoFirebase = require("./Carritos/FireBaseCarritos")


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