const admin = require('firebase-admin')
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require('../../Firebase/back43475-2e7f8-firebase-adminsdk-pg5pc-4801215f0a.json')

const Producto = require('./productoDaos')
const Productos = new Producto()

class ContainerFirebase {
    constructor(collectionToCreate, toInsert) {
        this.toInsert = toInsert
        this.collectionToCreate = collectionToCreate
        this.db = admin.firestore()

        admin.initializeApp({
            credential: admin.credential.cert(config),
            databaseURL: 'https://carrito-firebase-default-rtdb.firebaseio.com'
        })
    }

    async save(idCarrito, idProducto) {
        try {
            function random() {
                return Math.floor((Math.random() * 10000));
            }

            let productoAtlas = await Productos.getById(idProducto)

            
            const query = this.db.collection(this.collectionToCreate)
            // const doc = query.doc(idCarrito)
            productoAtlas["id"] = random()

        } catch (error) {
            console.log(error.message)
        }
    }


    async saveCart() {
        
        const query = this.db.collection('carritos')
        let time = new Date()
        try {
            const doc = query.doc()
            const carrito = await doc.create({
                timestamp: time.toString(),
                productos: []
            })
            return carrito
        } catch (error) {
            console.log(error.message)
        }
    }

    async getByIdCart(idC) {
        try {
            
            const query = this.db.collection('carritos')
            const doc = query.doc(String(idC))
            const encontrado = await doc.get()
            return encontrado.data()

        } catch (error) {
            console.log(error.message)
        }
    }

    async deleteCarritoById(idC) {
        try {
            
            const query = this.db.collection('carritos')
            const doc = query.doc(String(idC))
            await doc.delete()


        } catch (error) {
            console.log(error.message)
        }
    }


    async deleteProductoDeCarrito(idCarrito, idProducto, idEnCarrito) {
        try {
            function random(min, max) {
                return Math.floor((Math.random() * (max - min + 1)) + min);
            }

            let productoAtlas = await Productos.getById(idProducto)


            
            const query = this.db.collection('carritos')
            const doc = query.doc(idCarrito)

            productoAtlas.idC = idEnCarrito

            const item = await doc.update({
                productos: admin.firestore.FieldValue.arrayRemove(String(productoAtlas))
            })

        } catch (error) {
            console.log(error.message)
        }
    }


}

module.exports = ContainerFirebase