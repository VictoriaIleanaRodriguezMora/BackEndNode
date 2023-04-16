/* FUNCIONES que usan la PERSISTENCIA de MONGO. Son pasadas como middleware en el CONTROLLER */

const { findByUserName, saveCart, findByGmail, saveOrders, saveChat } = require("../PERSISTENCIA/persistenciaMongo")

const { sendEmailNodeMailer } = require("./middleware.servicio.nodemailer.js")


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
    // Esta funcion ENVIA EL MAIL

    const userFoundByGmail = await findByGmail__MongoService(gmail) // Para obtener el nombre de usuario, por que solo tengo el gmail.

    let titleCarts = [] // [ 'Titulo', 'Titulo 1', etc ]
    let msgUser = `Hola, ${userFoundByGmail}! Ordenaste: `
    let productos, precioFinal

    let objUser = {
        prods: productos,
        precioFinal: precioFinal
    }
    let totalPrice = 0

    for (let i = 0; i < carrito.length; i++) {
        titleCarts.push({ title: carrito[i].title })
        msgUser += `${titleCarts[i].title}, ` // Construyo el mensaje, para que incluya todos los titulos del carrito de compras
        totalPrice += carrito[i].price
        productos += `${titleCarts[i].title}, `
        precioFinal += carrito[i].price
    } 

    msgUser = msgUser.slice(0, -1); // Elimina la ultima coma que queda en el texto
    msgUser += ``

    const infoToGmail = {
        toSendEmail: gmail,
        subject: `Ecommerce Victoria: Pedido de Usuario: ${userFoundByGmail} Gmail: ${gmail}`,
        msg: msgUser
    }


    // await saveOrders(infoToMongo)
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