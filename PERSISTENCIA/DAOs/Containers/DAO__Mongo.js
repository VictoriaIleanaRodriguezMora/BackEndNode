const mongoose = require("mongoose")
/* LOG4JS */
const { log4jsConfigure } = require("../../../SERVICIO/LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
/* LOG4JS */

class DAO__Mongo {

    constructor(schemaToUse) {
        this.schemaToUse = schemaToUse // when you are going to execute this INSTANCE, you have to pass the path and the schemaToUse
    }

    async connectMDB() {
        try {
            const URL = "mongodb+srv://FUSSI:fussi0117@cluster0.jmg0aoz.mongodb.net/?retryWrites=true&w=majority"
            logger.debug("MONGO conectado a FUSSI:fussi0117");
            return mongoose.connect(URL, {
                useNewUrlParser: true,
                useUniFiedTopology: true
            })

        } catch (e) {
            logger.debug(e)
        }
    }

    async save(element) {
        try {
            await this.connectMDB()
            element["date"] = new Date().toLocaleString("en-GB")
            const elementMongoose = await this.schemaToUse.create(element)
            logger.debug("elementMongoose", elementMongoose["_id"]);

            // mongoose.disconnect()
            return elementMongoose["_id"]
        } catch (error) {
            logger.debug("save - Container Mongo:", error)
        }
    }

    async saveUser(element) {
        try {
            await this.connectMDB()
            const elementMongoose = await this.schemaToUse.create(element)
            logger.debug("elementMongoose", elementMongoose["_id"]);

            // mongoose.disconnect()
            return elementMongoose["_id"]
        } catch (error) {
            logger.debug("save - Container Mongo:", error)
        }
    }

    async saveCart(element) {
        try {
            await this.connectMDB()
            const elementMongoose = await this.schemaToUse.create(element)
            element["date"] = new Date().toLocaleString("en-GB")
            element["products"]["date"] = new Date().toLocaleString("en-GB")
            logger.debug("element['products']", element["products"]);

            // mongoose.disconnect()
            return elementMongoose["_id"]

        } catch (error) {
            logger.debug("save", error)
        }
    }

    async getAll() {
        try {

            await this.connectMDB()
            const element = await this.schemaToUse.find({})
            // logger.debug("getAll", element);

            // mongoose.disconnect() //ESTO ERA EL ERROR POOL
            return element

        } catch (error) {
            logger.debug("getAll", error)
        }
    }

    async getById(id) {
        try {
            await this.connectMDB()
            const elementId = await this.schemaToUse.findById(id)
            const num = Math.floor(Math.random() * 10000)
            // mongoose.disconnect()
            logger.debug(elementId);
            return elementId
        } catch (error) {
            logger.debug("getById", error)
        }
    }

    async getByIdCart(id) {
        try {
            await this.connectMDB()
            const elementId = await this.schemaToUse.findById(id)
            // mongoose.disconnect()
            logger.debug(elementId);
            return elementId
        } catch (error) {
            logger.debug("getByIdCart", error)
        }
    }

    async getByUsername(name) {
        try {
            await this.connectMDB()
            const elementId = await this.schemaToUse.find({ username: name })
            // mongoose.disconnect()
            logger.debug(elementId);
            return elementId
        } catch (error) {
            logger.debug("getByIdCart", error)
        }
    }

    async updateById(id, title, price) {
        try {
            await this.connectMDB()
            let elementToChange

            if (title != undefined) {
                elementToChange = await this.schemaToUse.update({ _id: id }, { $set: { title: title } });
                logger.debug(`UPDATE. The title in ${id} was updated to: ${title}`);
            }

            if (price != undefined) {
                elementToChange = await this.schemaToUse.update({ _id: id }, { $set: { price: price } });
                logger.debug(`UPDATE. The price in ${id} was updated to:  ${price}`);
            }

            // mongoose.disconnect()
            return elementToChange
        } catch (error) {
            logger.debug("updateById: ", error)
        }
    }

    async updateByIdCart(id, title, price) {
        try {
            await this.connectMDB()
            let elementToChange
            elementToChange["products"]["timestamp"] = new Date().toLocaleString("en-GB")

            if (title != undefined) {
                elementToChange = await this.schemaToUse.update({ _id: id }, { $set: { title: title } });
                logger.debug(`UPDATE. The title in ${id} was updated to: ${title}`);
            }

            if (price != undefined) {
                elementToChange = await this.schemaToUse.update({ _id: id }, { $set: { price: price } });
                logger.debug(`UPDATE. The price in ${id} was updated to:  ${price}`);
            }

            // mongoose.disconnect()
            return elementToChange
        } catch (error) {
            logger.debug("updateById: ", error)
        }
    }

    async deleteById(id) {
        try {
            await this.connectMDB()
            const deleted = await this.schemaToUse.deleteOne({ _id: id })
            // mongoose.disconnect()
            logger.debug("deleted", deleted);
            return deleted
        } catch (error) {
            logger.debug("deleteById()", error)
        }
    }

}

module.exports = { DAO__Mongo }