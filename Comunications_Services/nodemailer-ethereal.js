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

async function sendEmailNodeMailer() {
    try {
        const transporterAnswer = await transporter('victoriaileanarodriguezmora@gmail.com')
        const mailOptionsAnswer = await mailOptions()
        const info = await transporterAnswer.sendMail(mailOptionsAnswer)
        console.log(info)
    } catch (err) {
        console.log(err)
    }

}
sendEmailNodeMailer()







// lzaugeghhtysnnpv