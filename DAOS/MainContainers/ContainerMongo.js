const mongoose = require("mongoose")

/* LOG4JS */
const { log4jsConfigure } = require("../../LOGGERS/log4.js")
let logger = log4jsConfigure.getLogger()
/* LOG4JS */

class ContainerMongo {

    constructor(schemaToUse) {
        this.schemaToUse = schemaToUse // when you are going to execute this INSTANCE, you have to pass the path and the schemaToUse
    }

    async connectMDB() {
        try {
            const URL = "mongodb+srv://FUSSI:fussi0117@cluster0.jmg0aoz.mongodb.net/?retryWrites=true&w=majority"
            logger.info("MONGO conectado a FUSSI:fussi0117");
            return mongoose.connect(URL, {
                useNewUrlParser: true,
                useUniFiedTopology: true
            })

        } catch (e) {
            logger.info(e)
        }
    }

    async save(element) {
        try {
            await this.connectMDB()
            element["date"] = new Date().toLocaleString("en-GB")
            const elementMongoose = await this.schemaToUse.create(element)
            logger.info("elementMongoose", elementMongoose["_id"]);

            mongoose.disconnect()
            return elementMongoose["_id"]
        } catch (error) {
            logger.info("save - Container Mongo:", error)
        }
    }
    
    async saveUser(element) {
        try {
            await this.connectMDB()
            const elementMongoose = await this.schemaToUse.create(element)
            logger.info("elementMongoose", elementMongoose["_id"]);

            mongoose.disconnect()
            return elementMongoose["_id"]
        } catch (error) {
            logger.info("save - Container Mongo:", error)
        }
    }

    async saveCart(element) {
        try {
            await this.connectMDB()
            const elementMongoose = await this.schemaToUse.create(element)
            element["date"] = new Date().toLocaleString("en-GB")
            logger.info("element['products']", element["products"]);

            mongoose.disconnect()
            return elementMongoose["_id"]

        } catch (error) {
            logger.info("save", error)
        }
    }

    async getAll() {
        try {

            await this.connectMDB()
            const element = await this.schemaToUse.find({})
            // logger.info("getAll", element);

            // mongoose.disconnect() //ESTO ERA EL ERROR POOL
            return element

        } catch (error) {
            logger.info("getAll", error)
        }
    }

    async getById(id) {
        try {
            await this.connectMDB()
            const elementId = await this.schemaToUse.findById(id)
            const num = Math.floor(Math.random() * 10000)
            mongoose.disconnect()
            logger.info(elementId);
            return elementId
        } catch (error) {
            logger.info("getById", error)
        }
    }

    async getByIdCart(id) {
        try {
            await this.connectMDB()
            const elementId = await this.schemaToUse.findById(id)
            mongoose.disconnect()
            logger.info(elementId);
            return elementId
        } catch (error) {
            logger.info("getByIdCart", error)
        }
    }

    async updateById(id, title, price) {
        try {
            await this.connectMDB()
            let elementToChange

            if (title != undefined) {
                elementToChange = await this.schemaToUse.update({ _id: id }, { $set: { title: title } });
                logger.info(`UPDATE. The title in ${id} was updated to: ${title}`);
            }

            if (price != undefined) {
                elementToChange = await this.schemaToUse.update({ _id: id }, { $set: { price: price } });
                logger.info(`UPDATE. The price in ${id} was updated to:  ${price}`);
            }

            mongoose.disconnect()
            return elementToChange
        } catch (error) {
            logger.info("updateById: ", error)
        }
    }

    async updateByIdCart(id, title, price) {
        try {
            await this.connectMDB()
            let elementToChange
            elementToChange["products"]["timestamp"] = new Date().toLocaleString("en-GB")

            if (title != undefined) {
                elementToChange = await this.schemaToUse.update({ _id: id }, { $set: { title: title } });
                logger.info(`UPDATE. The title in ${id} was updated to: ${title}`);
            }

            if (price != undefined) {
                elementToChange = await this.schemaToUse.update({ _id: id }, { $set: { price: price } });
                logger.info(`UPDATE. The price in ${id} was updated to:  ${price}`);
            }

            mongoose.disconnect()
            return elementToChange
        } catch (error) {
            logger.info("updateById: ", error)
        }
    }

    async deleteById(id) {
        try {
            await this.connectMDB()
            const deleted = await this.schemaToUse.deleteOne({ _id: id })
            mongoose.disconnect()
            logger.info("deleted", deleted);
            return deleted
        } catch (error) {
            logger.info("deleteById()", error)
        }
    }

}

module.exports = ContainerMongo