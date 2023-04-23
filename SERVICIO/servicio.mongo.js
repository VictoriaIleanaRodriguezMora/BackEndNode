/* FUNCIONES que usan MONGO. Son pasadas como middleware en el CONTROLLER */

const { findByUserName, saveCart, findByGmail } = require("../PERSISTENCIA/persistenciaMongo")

const { sendEmailNodeMailer } = require("./middleware.servicio.nodemailer.js")

const { saveOrders, saveChat } = require("../PERSISTENCIA/persistenciaMongo")

async function findByUsername__MongoService(req, res) {

    const { username, password } = req.user;

    const userFindByUsername = await findByUserName(username)

    const { phone, adress, age, avatar, gmail } = await userFindByUsername[0]

    const user = { username, password, phone, adress, age, avatar, gmail };

    return user
}

async function findByGmail__MongoService(gmail) {

    const userFindByGmail = await findByGmail(gmail)

    const user = await userFindByGmail[0]

    return user.username
}

async function POST_Carritos__MongoService(carrito, gmail) {
    let titleCarts = [] // [ { title: 'Titulo' }, { title: 'Titulo 1' } ]
    const userFoundByGmail = await findByGmail__MongoService(gmail) // Para obtener el nombre de usuario
    let products = [], precioTotal = 0

    let objUser = {
        prods: products,
        precioTotal: precioTotal
    }

    for (let i = 0; i < carrito.length; i++) {
        titleCarts.push(carrito[i].title)

        objUser.prods += `${titleCarts[i]}, `
        precioTotal += parseInt(carrito[i].price)
        objUser.precioTotal = precioTotal
    }

    const infoToGmail = {
        toSendEmail: gmail,
        subject: `Ecommerce Victoria: Pedido de Usuario: ${userFoundByGmail} Gmail: ${gmail}`,
        msg: `Hola, ${userFoundByGmail}! Ordenaste: ${objUser.prods}. El precio total es: $${objUser.precioTotal} ARS.`
    }

    const infoToMongo = {
        username: userFoundByGmail,
        gmail: gmail,
        products: titleCarts,
        price: objUser.precioTotal,
        date: new Date().toLocaleString("en-GB")
    }

    await saveOrders(infoToMongo)
    // SE ENVIA EL MAIL
    await sendEmailNodeMailer(infoToGmail.toSendEmail, infoToGmail.subject, infoToGmail.msg)

}

async function SAVE_Chat__MongoService(chat) {
    await saveChat(chat)
}

module.exports = {
    findByUsername__MongoService,
    POST_Carritos__MongoService,
    SAVE_Chat__MongoService
}