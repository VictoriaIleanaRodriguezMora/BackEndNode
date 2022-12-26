const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const price = () =>  Math.round(Math.random() * 1500)
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

      ObjectToInsert['id'] = uuidv4()
      ObjectToInsert['timestamp'] = new Date().toLocaleString('en-GB')
      ObjectToInsert['products']['id'] = uuidv4()
      ObjectToInsert['products']['price'] = price()
      ObjectToInsert['products']['timestamp'] = new Date().toLocaleString( 'en-GB')

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

      console.log(elementById)
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

  async updateById(id, description, price) {
    const file = await fs.promises.readFile(this.nameFile, 'utf-8')
    let parsedFile = await JSON.parse(file)

    let elementToUpdate
    let indexElement
    let finalElement

    parsedFile.forEach((element) => {
      if (element.id == id) {
        elementToUpdate = element
      }
    })

    indexElement = parsedFile.indexOf(elementToUpdate)
    console.log(parsedFile[indexElement])
    finalElement = parsedFile[indexElement]

    if (description != undefined && finalElement["description"] != description) {
      finalElement['products']['description'] = description
      console.log(`description modified ${description}`)
    }

    if (price != undefined && finalElement["price"] != price) {
      finalElement['products']['price'] = price
      console.log(`price modified ${price}`)
    }

    await fs.promises.writeFile(
      this.nameFile,
      JSON.stringify(parsedFile),
      'utf-8',
    )

    return finalElement
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
