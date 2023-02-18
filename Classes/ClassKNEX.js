/* LOG4JS */
const { log4jsConfigure } = require("../LOGGERS/log4.js")
let logger = log4jsConfigure.getLogger()
/* LOG4JS */

class PetitionKNEX {
  constructor(dbConfig, tableName) {
    this.dbConfig = require('knex')(dbConfig)
    this.tableName = tableName
  }

  // createTableProds
  async createTableProds() {
    this.dbConfig.schema
      .createTable(this.tableName, (table) => {
        table.string('title', 15),
          table.integer('price'),
          table.string('thumbnail', 40),
          table.increments('id').unique
      })
      .then((res) => {
        logger.info(`Table ${this.tableName} CREATED`)
        logger.info('RES', res)
      })
      .catch((err) => {
        logger.info('Table Students ERROR', err)
      })
      .finally(() => {
        this.dbConfig.destroy()
      })
  }

  // createTableChat
  async createTableChat() {
    this.dbConfig.schema
      .createTable(this.tableName, (table) => {
        table.string('email', 20),
          table.string('message', 20),
          table.string('fechaParsed', 40),
          table.increments('id').unique
      })
      .then((res) => {
        //I want to see the name, that creates here in the then
        logger.info(`Table ${this.tableName} CREATED`)
        logger.info('RES', res)
      })
      .catch((err) => {
        logger.info('Table Students ERROR', err)
      })
      .finally(() => {
        this.dbConfig.destroy()
      })
  }

  // Insert
  async insert(toInsert) {
    this.dbConfig(this.tableName)
      .insert(toInsert)
      .then((res) => {
        logger.info(`INSERT in ${this.tableName} succesfully`)
        logger.info(`res ${res}`)
      })
      .catch((err) => {
        logger.info(err)
      })
      .finally(() => {
        this.dbConfig.destroy()
      })
  }
  async insertCHAT(toInsert) {
    toInsert['fechaParsed'] = new Date().toLocaleString('en-GB')
    this.dbConfig(this.tableName)
      .insert(toInsert)
      .then((res) => {
        logger.info(`INSERT in ${this.tableName} succesfully`)
        logger.info(`res ${res}`)
      })
      .catch((err) => {
        logger.info(err)
      })
      .finally(() => {
        this.dbConfig.destroy()
      })
  }
  //  Select
  // SELECT * FROM test.products LIMIT 0, 1000
  async select(toSelect) {
    let data = await this.dbConfig(this.tableName)
      .select(toSelect)
      .then((response) => response)
      .catch((err) => logger.info(err))
    return data
  }

  // Update
  async update(toFind, toUpdate) {
    logger.info(toFind, toUpdate)

    this.dbConfig(this.tableName)
      .where('id', '=', '1')
      .update(toUpdate)
      .then((res) => {
        if (res == 0) {
          logger.info(`WHERE & UPDATE in ${this.tableName} doesn"t found`)
          logger.info('RES', res)
        } else {
          logger.info(`WHERE & UPDATE in ${this.tableName} succesfully`)
          logger.info('RES', res)
        }
      })
      .catch((err) => {
        logger.info(`WHERE & UPDATE in ${this.tableName} ERROR`, err)
      })
      .finally(() => {
        this.dbConfig.destroy()
      })
  }

  async delete(toDelete) {
    this.dbConfig(this.tableName)
      // .where("price", "=", "800") // Descomentar para PRODUCTOS
      .where('message', '=', 'hi') // Descomentar para MENSAJES
      .delete()
      .then((res) => {
        if (res == 0) {
          logger.info(`DELETE in ${this.tableName} doesn"t found`)
          logger.info('RES', res)
        } else {
          logger.info(`DELETE in ${this.tableName} succesfully`)
          logger.info('RES', res)
        }
      })
      .catch((err) => {
        logger.info(`WHERE & UPDATE in ${this.tableName} ERROR`, err)
      })
      .finally(() => {
        this.dbConfig.destroy()
      })
  }

  // Delete
}

module.exports = {
  PetitionKNEX,
}

// "message", "=", "hola"

// UPDATE `test`.`products` SET `price` = "400" WHERE (`id` = "4");

// UPDATE `test`.`products` SET `precio` = 500 WHERE (`price` = 600) // XXX
// UPDATE `test`.`products` SET `price` = "500" WHERE (`id` = "2");
// INSERT INTO products (title, price, thumbnail) VALUES ("BALL", "500", "https://")

// const { PetitionKNEX } = require("./Classes/ClassKNEX") // CLASS KNEX

// const { optionsMySQL } = require("./options/options")
// const productsMySQL = new PetitionKNEX(optionsMySQL, "products")
// // productsMySQL.createTableProds() // This creates the table PRODUCTS
// // productsMySQL.insert(Escuadra) // WORKS
// productsMySQL.select("*")// Le pasa por parametro que quiere selectear
// // productsMySQL.update((`id`, "=", "4"), { price: 777 })
// // productsMySQL.update("", {price: 798})
// // productsMySQL.delete()

// const { optionsSQLite3 } = require("./options/options")
// const chatSQLite3 = new PetitionKNEX(optionsSQLite3, "messages")
// // chatSQLite3.createTableChat()
// chatSQLite3.insert(chatMsg)
// // chatSQLite3.select("*")
// // chatSQLite3.update("", {message: "holaa"})
// // chatSQLite3.delete()
