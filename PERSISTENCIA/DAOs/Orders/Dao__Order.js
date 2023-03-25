const { DAO__Mongo } = require("../Containers/DAO__Mongo")

// LOG4JS 
const { log4jsConfigure } = require("../../../SERVICIO/LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
// LOG4JS 


class OrdersDaoMongo extends DAO__Mongo {
    async saveOrder(order) {
        try {
            await this.connectMDB()
            const elementMongoose = await this.schemaToUse.create(order)

            logger.debug("elementMongoose", elementMongoose);




            
            return elementMongoose

        } catch (error) {
            logger.debug("save", error)
        }

    }
}


module.exports = { OrdersDaoMongo }