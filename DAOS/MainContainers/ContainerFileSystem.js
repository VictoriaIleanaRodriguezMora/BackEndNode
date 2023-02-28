const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const { v1: uuidv1 } = require('uuid')

/* LOG4JS */
const { log4jsConfigure } = require("../../SERVICIO/LOGGERS/log4.js")
let logger = log4jsConfigure.getLogger()
/* LOG4JS */

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
          logger.info('writeFile in save', e)
        })
      }
      logger.info('save', error)
    }
    logger.info(
      ' ObjectToInsert ObjectToInsert ObjectToInsert ObjectToInsert ObjectToInsert',
      ObjectToInsert,
    )

    return ObjectToInsert['id']
  }

  async getAll() {
    try {
      const file = await fs.promises.readFile(this.nameFile, 'utf-8')
      let parsedFile = await JSON.parse(file)
      logger.info(parsedFile)
      return parsedFile
    } catch (error) {
      logger.info('getAll()', error)
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
      logger.info('getById()', error)
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
      logger.info('elementById', elementById)

      return elementById
    } catch (error) {
      logger.info('getById()', error)
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
          logger.info(elementById)
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

      logger.info(elementById['id'])
      return ObjectToInsert['id']
    } catch (error) {
      if (error.code === 'ENOENT') {
        fs.writeFile(this.nameFile, '[]', (e) => {
          logger.info('writeFile in save', e)
        })
      }
      logger.info('save', error)
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
          // logger.info(element);
          elementToDelete = element
          return parsedFile
        } else {
          return null
        }
      })
      positionObj = parsedFile.indexOf(elementToDelete)
      logger.info(parsedFile[positionObj])
      parsedFile.splice(positionObj, 1)

      await fs.promises.writeFile(
        this.nameFile,
        JSON.stringify(parsedFile),
        'utf-8',
      )
      return parsedFile
    } catch (error) {
      logger.info('deleteById()', error)
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
      logger.info('deleteAll()', error)
    }
  }
}

// --------- PRODUCTS ---------

module.exports = ContainerFileSystem
