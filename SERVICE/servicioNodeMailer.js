const { createTransport } = require('nodemailer');

/* LOG4JS */
const { log4jsConfigure } = require("../SERVICE/LOGGERS/log4")
let logger = log4jsConfigure.getLogger()
/* LOG4JS */

const transporter = (user) => {

    return createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user,
            pass: 'hlqrcgbzzmvihuot'
        }
    })

};

const mailOptions = (toSend, subject, msg) => {
    const mailOp = {
        from: 'Servidor Node.js',
        to: toSend,
        subject,
        html: msg
    }
    return mailOp
}

async function sendEmailNodeMailer(toSend, subject, msg) {

    logger.info("sendEmailNodeMailerrr");
    try {
        // LOG
        logger = log4jsConfigure.getLogger("warn")
        // LOG
        const transporterAns = await transporter(toSend)
        const mailOptionsAns = await mailOptions(toSend, subject, msg)
        const info = await transporterAns.sendMail(mailOptionsAns)

        logger.warn("sendEmailNodeMailer", info)
    } catch (err) {
        console.log(err)
    }

}

module.exports = {
    transporter,
    mailOptions,
    sendEmailNodeMailer
}

