const admin = require('firebase-admin')
const serviceAccount = require('./back43475-2e7f8-firebase-adminsdk-pg5pc-7b673f96e2.json')
const { v4: uuidv4 } = require('uuid');
let idCode = uuidv4();

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
      let arrToRes = resFireStore.docs.map((docs) => {
        return { id: docs.id, ...docs.data() }
      })
      console.log(arrToRes)
      return arrToRes
    } catch (error) {
      console.log(error)
    }
  }

  async save(toInsert) {
    try {
      toInsert['id'] = uuidv4()
      toInsert['timestamp'] = new Date().toLocaleString('en-GB')
      toInsert['products']['id'] = uuidv4()
      toInsert['products']['timestamp'] = new Date().toLocaleString('en-GB')
      toInsert['products']['price'] = price()
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

  async saveCart(id, body) {
    const query = await await this.db
      .collection(this.collectionToUse)
      .doc(id)
      .get()
    const queryParsed = query.data()
    queryParsed['products'] = body
    queryParsed['timestamp'] = new Date().toLocaleString('en-GB')
    console.log(queryParsed)
    return queryParsed
  }
  catch(error) {
    console.log(error)
  }

  async getById(idProd) {
    try {
      const collections = await this.db
        .collection(this.collectionToUse)
        .doc(idProd)
        .get()
      console.log('getById')
      console.log(collections.data())
      return collections.data()
    } catch (error) {
      console.log(error)
    }
  }

  async getByIdCart(idProd) {
    try {
      const collections = await this.db
        .collection(this.collectionToUse)
        .doc(idProd)
        .get()
      // .doc()

      let dataParsed = collections.data()
      console.log(dataParsed['products'])
      console.log('getByIdCart')
      return dataParsed['products']
    } catch (error) {
      console.log(error)
    }
  }

  async updateById(id, description, price) {
    // 0
    try {
      const docToUpdate = await this.db.collection(this.collectionToUse).doc(id)

      const elementToChange = await (await this.db.collection(this.collectionToUse).doc(id).get()).data()     
      elementToChange["timestamp"] = new Date().toLocaleString('en-GB')
      elementToChange["products"][["timestamp"]] = new Date().toLocaleString('en-GB')
      let res

      if (description != undefined) {
        res = await docToUpdate.update({ description: description })
        console.log(
          `UPDATE. The description in ${id} was updated to: ${description}`,
        )
      }

      if (price != undefined) {
        res = await docToUpdate.update({ price: price })
        console.log(`UPDATE. The price in ${id} was updated to:  ${price}`)
      }

      return elementToChange
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
