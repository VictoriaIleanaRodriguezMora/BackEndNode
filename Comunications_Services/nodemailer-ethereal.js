const { createTransport } = require('nodemailer');

/* LOG4JS */
const { log4jsConfigure } = require("../LOGGERS/log4")
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

/* const infoGmail = {
    toSend: "victoriaileanarodriguezmora@gmail.com",
    subject: "funciona?",
    msg: "ALO"
}

sendEmailNodeMailer(infoGmail.toSend, infoGmail.subject, infoGmail.msg)
 */



/* const { createTransport } = require('nodemailer');

const TEST_MAIL = 'daphne.lemke82@ethereal.email'

const transporter = (toSendEmail) => {
    return createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: toSendEmail,
            pass: 'MJfnvXYeKJEwgHMHCU'
        }
    });
}

const mailOptions = (emailToSend, subject, msg) => {
    const configEmail = {
        from: 'Servidor Node.js',
        to: emailToSend,
        subject: subject,
        html: msg
    }

    return configEmail
}

async function sendEmailNodeMailer(toSendEmail, subject, msg) {
    console.log("sendEmailNodeMailer");
    try {
        const transporterAnswer = await transporter(toSendEmail)
        const mailOptionsAnswer = await mailOptions(toSendEmail, subject, msg)
        const info = await transporterAnswer.sendMail(mailOptionsAnswer)
        console.log(info)
    } catch (err) {
        console.log("sendEmailNodeMailer ERROR",err)
    }

}

sendEmailNodeMailer('victoriaileanarodriguezmora@gmail.com', "hiiiiiiiiiiiiiii", "holahola")

module.exports = {
    createTransport,
    transporter,
    mailOptions,
    sendEmailNodeMailer
} */