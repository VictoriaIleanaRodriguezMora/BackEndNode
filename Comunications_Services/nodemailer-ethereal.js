const { createTransport } = require('nodemailer');

const TEST_MAIL = 'pearlie.hintz@ethereal.email'

const transporter = (toSendEmail) => {
    return createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: toSendEmail,
            pass: 'hlqrcgbzzmvihuot'
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
    console.log(sendEmailNodeMailer);
    try {
        const transporterAnswer = await transporter(toSendEmail)
        const mailOptionsAnswer = await mailOptions(subject)
        const info = await transporterAnswer.sendMail(mailOptionsAnswer)
        console.log(info)
    } catch (err) {
        console.log(err)
    }

}

module.exports = {
    createTransport,
    transporter,
    mailOptions,
    sendEmailNodeMailer
}