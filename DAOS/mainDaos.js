// File Sytem
const ProductsDaoFileSystem = require('./Products/FileSystemProducts')
const CarritosDaoFileSystem = require("./Carritos/FileSystemCarritos")

//  Mongo
const ProductsDaoMongo = require('./Products/MongoProducts')
const CarritosDaoMongo = require("./Carritos/MongoCarritos")

// Firebase
// const ProductsDaoFireBase = require('./Products/FireBaseProducts')
// const CarritosDaoFireBase = require("./Carritos/FireBaseCarritos")



module.exports = {
    // File Sytem

    ProductsDaoFileSystem,
    CarritosDaoFileSystem,

    // Mongo 
    ProductsDaoMongo,
    CarritosDaoMongo

    // Firebase
    // ProductsDaoFireBase,
    // CarritosDaoFireBase,
}  