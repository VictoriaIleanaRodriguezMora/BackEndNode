const twilio = require('twilio')

const accountSid = 'AC1668abc4b67f83be17c91e46c1368285'
const authToken = '4e2e3862def46d83672eb3bd8bd27242'

const client = twilio(accountSid, authToken)

/* LOG4JS */
const { log4jsConfigure } = require("../LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
/* LOG4JS */

async function twilioSMS(msg, to) {
    try {
        logger = log4jsConfigure.getLogger("warn")
        const message = await client.messages.create({
            body: msg,
            from: '+12053044674',
            to: to
        })

        logger.warn("SMS twilio", message)

    } catch (error) {
        console.log(error)
    }
}


async function twilioWPP(msg) {
    try {
        logger = log4jsConfigure.getLogger("warn")
        const message = await client.messages.create({
            body: msg,
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+5491133990583'
        })

        logger.warn("WPP twilio", message)

    } catch (error) {
        console.log("TWILIO WPP ERROR", error)
    }
}
module.exports = { twilioSMS, twilioWPP }