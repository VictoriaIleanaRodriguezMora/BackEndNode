const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const { v1: uuidv1 } = require('uuid')

// CLASS
class ContainerFileSystem {
  constructor(nameFile) {
    this.nameFile = nameFile
  }

  async save(ObjectToInsert) {
    // Number - Receives an object, saves it to the file, returns the assigned id.

    try {
      const file = await fs.promises.readFile(this.nameFile, 'utf-8')
      let parsedFile = await JSON.parse(file)

      ObjectToInsert['id'] = uuidv1()
      ObjectToInsert['timestamp'] = new Date().toLocaleString('en-GB')
      ObjectToInsert['products']['id'] = uuidv4()
      ObjectToInsert['products']['timestamp'] = new Date().toLocaleString(
        'en-GB',
      )

      await fs.promises.writeFile(
        this.nameFile,
        JSON.stringify((parsedFile = [...parsedFile, ObjectToInsert])),
        'utf-8',
      )

      return ObjectToInsert['id']
    } catch (error) {
      if (error.code === 'ENOENT') {
        fs.writeFile(this.nameFile, '[]', (e) => {
          console.log('writeFile in save', e)
        })
      }
      console.log('save', error)
    }
    console.log(
      ' ObjectToInsert ObjectToInsert ObjectToInsert ObjectToInsert ObjectToInsert',
      ObjectToInsert,
    )

    return ObjectToInsert['id']
  }

  async getAll() {
    try {
      const file = await fs.promises.readFile(this.nameFile, 'utf-8')
      let parsedFile = await JSON.parse(file)
      console.log(parsedFile)
      return parsedFile
    } catch (error) {
      console.log('getAll()', error)
    }
  }

  async getById(Id) {
    // ~ getById(Number): Object - Receives an id and returns the object with that id, or null if not present.
    try {
      const file = await fs.promises.readFile(this.nameFile, 'utf-8')
      let parsedFile = await JSON.parse(file)
      let elementById

      parsedFile.forEach((element) => {
        if (element.id == Id) {
          elementById = element
          return elementById
        } else {
          return null
        }
      })

      return elementById
    } catch (error) {
      console.log('getById()', error)
    }
  }

  async getByIdCart(Id) {
    // ~ getById(Number): Object - Receives an id and returns the object with that id, or null if not present.
    try {
      const file = await fs.promises.readFile(this.nameFile, 'utf-8')
      let parsedFile = await JSON.parse(file)
      let elementById

      parsedFile.forEach((element) => {
        if (element['products']['id'] == Id) {
          elementById = element['products']
          return elementById
        } else {
          return null
        }
      })
      console.log('elementById', elementById)

      return elementById
    } catch (error) {
      console.log('getById()', error)
    }
  }

  async updateById(ObjectToInsert, idCart, name, price) {
    // Number - Receives an object, saves it to the file, returns the assigned id.
    try {
      const file = await fs.promises.readFile(this.nameFile, 'utf-8')
      let parsedFile = await JSON.parse(file)

      let elementById

      parsedFile.forEach((element) => {
        if (element.id == idCart) {
          elementById = element['products']
          console.log(elementById)
          return elementById
        } else {
          return null
        }
      })

      elementById['timestamp'] = new Date().toLocaleString('en-GB')

      if (name != undefined) {
        elementById.name = name
      }

      if (price != undefined) {
        elementById.price = price
      }
      await fs.promises.writeFile(
        this.nameFile,
        JSON.stringify((parsedFile = [...parsedFile, ObjectToInsert])),
        'utf-8',
      )

      console.log(elementById['id'])
      return ObjectToInsert['id']
    } catch (error) {
      if (error.code === 'ENOENT') {
        fs.writeFile(this.nameFile, '[]', (e) => {
          console.log('writeFile in save', e)
        })
      }
      console.log('save', error)
    }
  }

  async deleteById(Id) {
    // ~ deleteById(Number): void - Deletes the object with the searched id from the file.
    try {
      const file = await fs.promises.readFile(this.nameFile, 'utf-8')
      let parsedFile = await JSON.parse(file)

      let positionObj
      let elementToDelete
      parsedFile.forEach((element) => {
        if (element.id == Id) {
          // console.log(element);
          elementToDelete = element
          return parsedFile
        } else {
          return null
        }
      })
      positionObj = parsedFile.indexOf(elementToDelete)
      console.log(parsedFile[positionObj])
      parsedFile.splice(positionObj, 1)

      await fs.promises.writeFile(
        this.nameFile,
        JSON.stringify(parsedFile),
        'utf-8',
      )
      return parsedFile
    } catch (error) {
      console.log('deleteById()', error)
    }
  }

  async deleteAll() {
    try {
      const file = await fs.promises.readFile(this.nameFile, 'utf-8')
      let parsedFile = await JSON.parse(file)

      parsedFile.splice(0)

      await fs.promises.writeFile(
        this.nameFile,
        JSON.stringify(parsedFile),
        'utf-8',
      )

      return parsedFile
    } catch (error) {
      console.log('deleteAll()', error)
    }
  }
}

// --------- PRODUCTS ---------

module.exports = ContainerFileSystem
