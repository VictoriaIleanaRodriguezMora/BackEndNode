const { createTransport } = require('nodemailer');

const TEST_MAIL = 'pearlie.hintz@ethereal.email'

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: 'etJTjcmbkuhhhWHCpt'
    }
});


const mailOptions = {
    from: 'Servidor Node.js',
    to: TEST_MAIL,
    subject: 'Mail de prueba desde Node.js',
    html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
}

async function sendEmailNodeMailer() {
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (err) {
        console.log(err)
    }

}
sendEmailNodeMailer()