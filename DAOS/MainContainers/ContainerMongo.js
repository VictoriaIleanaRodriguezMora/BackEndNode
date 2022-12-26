const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
// import { connect } from 'mongoose';
class ContainerMongo {
  constructor(schemaToUse) {
    this.schemaToUse = schemaToUse // when you are going to execute this INSTANCE, you have to pass the path and the schemaToUse
  }

  async connectMDB() {
    try {
      const URL =
        'mongodb+srv://FUSSI:fussi0117@cluster0.jmg0aoz.mongodb.net/?retryWrites=true&w=majority'

      return mongoose.connect(URL, {
        useNewUrlParser: true,
        useUniFiedTopology: true,
      })
    } catch (e) {
      console.log(e)
    }
  }

  async save(element) {
    try {
      await this.connectMDB()
      element['id'] = uuidv4()
      element['products']['id'] = uuidv4()
      element['date'] = new Date().toLocaleString('en-GB')
      element['products']['timestamp'] = new Date().toLocaleString('en-GB')
      const elementMongoose = await this.schemaToUse.create(element)
      console.log('elementMongoose', elementMongoose['_id'])

      mongoose.disconnect()
      return elementMongoose
    } catch (error) {
      console.log('save - Container Mongo:', error)
    }
  }
  async saveCart(id, body) {
    try {
      await this.connectMDB()
      let getByIdSaveCart = await this.getById(id)
      // console.log(getByIdSaveCart['products'][0])
      if (body != undefined) {
        getByIdSaveCart['products'][0] = body
        getByIdSaveCart['products'][0]['timestamp'] = new Date().toLocaleString(
          'en-GB',
        )
      }

      mongoose.disconnect()
      return getByIdSaveCart
    } catch (error) {
      console.log('save', error)
    }
  }

  async getAll() {
    try {
      await this.connectMDB()
      const element = await this.schemaToUse.find({})
      console.log('element', element)

      mongoose.disconnect()
      return element
    } catch (error) {
      console.log('getAll', error)
    }
  }

  async getById(id) {
    try {
      await this.connectMDB()
      const elementId = await this.schemaToUse.findById(id)
      mongoose.disconnect()
      console.log(elementId)
      return elementId
    } catch (error) {
      console.log('getById', error)
    }
  }

  async getByIdCart(idPostman) {
    try {
      console.log(idPostman)
      await this.connectMDB()
      const elementId = await this.schemaToUse.find({})
      // console.log(elementId);
      let idCart
      elementId.forEach((e) => {
        // console.log(e.products[0].id);
        if (e['products'][0]['id'] == idPostman) {
          idCart = e['products'][0]
        }
      })

      mongoose.disconnect()
      console.log(idCart)
      return idCart
    } catch (error) {
      console.log('getByIdCart', error)
    }
  }

  async updateById(id, description, price) {
    try {
      await this.connectMDB()
      let elementToChange 
      // console.log(elementToChange["products"][0])

      if (description != undefined) {
        elementToChange = await this.schemaToUse.updateOne(
          { _id: id },
          { $set: { description: description } },
        )
        console.log(
          `UPDATE. The description in ${id} was updated to: ${description}`,
        )
      }

      if (price != undefined) {
        elementToChange = await this.schemaToUse.updateOne(
          { _id: id },
          { $set: { price: price } },
        )
        console.log(`UPDATE. The price in ${id} was updated to:  ${price}`)
      }

      mongoose.disconnect()
      return elementToChange
    } catch (error) {
      console.log('updateById: ', error)
    }
  }

  async updateByIdCart(id, title, price) {
    try {
      await this.connectMDB()
      let elementToChange
      elementToChange['products']['timestamp'] = new Date().toLocaleString(
        'en-GB',
      )

      if (title != undefined) {
        elementToChange = await this.schemaToUse.update(
          { _id: id },
          { $set: { title: title } },
        )
        console.log(`UPDATE. The title in ${id} was updated to: ${title}`)
      }

      if (price != undefined) {
        elementToChange = await this.schemaToUse.update(
          { _id: id },
          { $set: { price: price } },
        )
        console.log(`UPDATE. The price in ${id} was updated to:  ${price}`)
      }

      mongoose.disconnect()
      return elementToChange
    } catch (error) {
      console.log('updateById: ', error)
    }
  }

  async deleteById(id) {
    try {
      await this.connectMDB()
      const deleted = await this.schemaToUse.deleteOne({ _id: id })
      mongoose.disconnect()
      console.log('deleted', deleted)
      return deleted
    } catch (error) {
      console.log('deleteById()', error)
    }
  }
}

module.exports = ContainerMongo
