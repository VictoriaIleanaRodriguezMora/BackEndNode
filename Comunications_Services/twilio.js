const twilio = require('twilio')

const accountSid = 'AC1668abc4b67f83be17c91e46c1368285'
const authToken = '5ec9dae1c8ae910434eb105d0c8225e9'

const client = twilio(accountSid, authToken)

/* LOG4JS */
const { log4jsConfigure } = require("../LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
/* LOG4JS */

async function twilioo(msg, to) {
    try {
        // LOG
        logger = log4jsConfigure.getLogger("warn")
        // LOG
        const message = await client.messages.create({
            body: msg,
            from: '+12053044674',
            to: to
        })
        
        logger.warn("msg twilio", message)

    } catch (error) {
        console.log(error)
    }
}

// twilioo()

module.exports = { client, twilioo }