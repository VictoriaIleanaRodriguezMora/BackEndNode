const {

    UsuarioSchemaApp,
    MongoUsersInstance,
    CarritosSchema,
    MongoCarritosInstance,
    schemaUsuariosPassport

} = require("./servicioSchemas.js")

const { sendEmailNodeMailer } = require("./servicioNodeMailer.js")
const { twilioSMS, twilioWPP } = require("./servicioTwilio")

async function findByUsername__MongoService(req, res) {
    const { username, password } = req.user;

    const userFindByUsername = await MongoUsersInstance.getByUsername(username)

    const { phone, adress, age, avatar, gmail } = await userFindByUsername[0]

    const user = { username, password, phone, adress, age, avatar, gmail };

    return user
}

async function POSTCarritos__MongoService(req, res) {
    const { description, photo, price, name, title } = req.body
    const toSave = { title, products: { description, photo, price, name } }
    await MongoCarritosInstance.saveCart(toSave)


    // nodemailer
    const { username } = req.user;
    const userFindByUsername = await MongoUsersInstance.getByUsername(username)
    const { phone, adress, age, avatar, gmail } = userFindByUsername[0]
    const infoToGmail = {
        subject: `Nuevo pedido de Usuario: ${username} Gmail: ${gmail}`,
        toSendEmail: gmail,
        emailToSend: gmail,
        msg: `Hola, ${username}! Usd se registró con el mail: ${gmail}. Y ha realizado esta orden: ${toSave.title}, ${toSave.products.description}, ${toSave.products.photo}, ${toSave.products.price}, ${toSave.products.name}. Saludos!`,
        tituloOrden: toSave.title,
    }

    await sendEmailNodeMailer(infoToGmail.toSendEmail, infoToGmail.subject, infoToGmail.msg)

    // nodemailer
    // TWILIO
    /*     await twilioSMS(infoToGmail.msg, phone)
        await twilioWPP(infoToGmail.msg) */
    // TWILIO

    return toSave

}


module.exports = {
    findByUsername__MongoService,
    POSTCarritos__MongoService
}