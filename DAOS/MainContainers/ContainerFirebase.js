const admin = require('firebase-admin')
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require('../../Firebase/back43475-2e7f8-firebase-adminsdk-pg5pc-4801215f0a.json')

// const Producto = require('./productoDaos')
// const Productos = new Producto()

class ContainerFirebase {
    constructor(collectionToUse, toInsert) {
        this.toInsert = toInsert;
        this.collectionToUse = collectionToUse;

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        this.db = admin.firestore();
    }

    async getAll() {
        try {
            const resFireStore = await this.db.collection(this.collectionToUse).get()
            // console.log(resFireStore);
            let arrToRes = resFireStore.docs.map((docs) => {
                return { id: docs.id, ...docs.data() };
            })
            console.log(arrToRes);
            return arrToRes

        } catch (error) {
            console.log(error)
        }
    }

    async save(toInsert) {
        try {
            const resFireStore = await this.db.collection(this.collectionToUse).doc().set(toInsert);
            console.log(resFireStore);
            return resFireStore
        } catch (error) {
            console.log(error)
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
            console.log(error)
        }
    }

    async getById(idProd) {
        try {
            const collections = await this.db.collection(this.collectionToUse)
            const findById = collections.where("id", "==", idProd).get()
            return findById

        } catch (error) {
            console.log(error)
        }
    }

    async getByIdCart(idC) {
        try {

            const query = this.db.collection('carritos')
            const doc = query.doc(String(idC))
            const encontrado = await doc.get()
            return encontrado.data()

        } catch (error) {
            console.log(error)
        }
    }

    async updateById(id, title, price) {
        try {
            const docToUpdate = this.db.collection(this.collectionToUse).doc(id);
            let res


            if (title != undefined) {
                res = await docToUpdate.update({ title: title })
                console.log(`UPDATE. The title in ${id} was updated to: ${title}`);
            }

            if (price != undefined) {
                res = await docToUpdate.update({ price: price })
                // console.log(`UPDATE. The price in ${id} was updated to:  ${price}`);
            }
            console.log("res", res);
            return res
        } catch (error) {
            console.log("updateById: ", error)
        }
    }

    async deleteById(IDtoDelete) {
        try {
            const docToDelete = await this.db.collection(this.collectionToUse).doc(IDtoDelete);
            let res = await docToDelete.delete();
            console.log(`${IDtoDelete} succesfully deleted`);
            return res
        } catch (error) {
            console.log(error)
        }
    }


    async deleteCarritoById(toDelete) {
        try {
            const res = await this.db
                .collection(this.collectionToUse)
                .doc(toDelete)
                .delete();

            return res
        } catch (error) {
            console.log(error)
        }
    }


}

module.exports = ContainerFirebase