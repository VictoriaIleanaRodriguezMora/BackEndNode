const admin = require('firebase-admin')
const serviceAccount = require('./back43475-2e7f8-firebase-adminsdk-pg5pc-7b673f96e2.json')
const { v4: uuidv4 } = require('uuid')
let idCode = uuidv4()

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})
class ContainerFirebase {
  constructor(collectionToUse) {
    this.collectionToUse = collectionToUse
    this.db = admin.firestore()
  }
  async getAll() {
    try {
      const resFireStore = await this.db.collection(this.collectionToUse).get()
      // console.log(resFireStore);
      let arrToRes = resFireStore.docs.map((docs) => {
        return { id: docs.id, ...docs.data() }
      })
      // console.log(arrToRes);
      return arrToRes
    } catch (error) {
      console.log(error)
    }
  }

  async save(toInsert) {
    try {
      toInsert['timestamp'] = new Date().toLocaleString('en-GB')
      toInsert['products']['id'] = idCode
      toInsert['products']['timestamp'] = new Date().toLocaleString('en-GB')
      const resFireStore = await this.db
        .collection(this.collectionToUse)
        .doc()
        .set(toInsert)
      console.log(resFireStore, toInsert)
      return toInsert
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
        productos: [],
      })
      return carrito
    } catch (error) {
      console.log(error)
    }
  }

  async saveChat(toInsert) {
    try {
      // toInsert = new Date().toLocaleString("en-GB")
      toInsert['id'] = idCode
      toInsert['fechaParsed'] = new Date().toLocaleString('en-GB')
      const resFireStore = await this.db
        .collection(this.collectionToUse)
        .doc()
        .set(toInsert)
      console.log(resFireStore, toInsert)
      return toInsert
    } catch (error) {
      console.log(error)
    }
  }

  async getById(idProd) {
    try {
      const collections = await this.db
        .collection(this.collectionToUse)
        .doc(idProd)
      console.log(collections.id)

      console.log('getById')
      return collections
    } catch (error) {
      console.log(error)
    }
  }

  async getByIdCart(idProd) {
    // get better
    try {
      const collections = await this.db
        .collection(this.collectionToUse)
        .doc(idProd)
      const dataParsed = await collections.data()
      console.log({ id: dataParsed.id })
      console.log('getByIdCart')
      // return { id: dataParsed.id, data: { ...dataParsed.data() } }1
    } catch (error) {
      console.log(error)
    }
  }

  async updateById(id, title, price) {
    try {
      const docToUpdate = this.db.collection(this.collectionToUse).doc(id)
      let res

      if (title != undefined) {
        res = await docToUpdate.update({ title: title }) // ["products"]
        console.log(`UPDATE. The title in ${id} was updated to: ${title}`)
      }

      if (price != undefined) {
        // ["products"]
        res = await docToUpdate.update({ price: price })
        // console.log(`UPDATE. The price in ${id} was updated to:  ${price}`);
      }
      console.log('res', res)
      return res
    } catch (error) {
      console.log('updateById: ', error)
    }
  }

  async deleteById(IDtoDelete) {
    try {
      const docToDelete = await this.db
        .collection(this.collectionToUse)
        .doc(IDtoDelete)
      let res = await docToDelete.delete()
      console.log(`${IDtoDelete} succesfully deleted`)
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
        .delete()

      return res
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = ContainerFirebase
