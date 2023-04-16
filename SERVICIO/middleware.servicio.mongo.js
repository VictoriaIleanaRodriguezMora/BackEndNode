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
    let titleCarts = [] // [ 'Salad', 'Computer' ]
    let msgUser = `Ordenaste: `
    for (let i = 0; i < carrito.length; i++) {
        titleCarts.push({ title: carrito[i].title })
        console.log(carrito[i]);
        msgUser += `${titleCarts[i].title}, `
    }
    // console.log(titleCarts);

    const userFoundByGmail = await findByGmail__MongoService(gmail) // Para obtener el nombre de usuario

    const infoToGmail = {
        toSendEmail: gmail,
        subject: `Ecommerce Victoria: Pedido de Usuario: ${userFoundByGmail} Gmail: ${gmail}`,
        msg: `Hola, ${userFoundByGmail}! + ${msgUser}`,
        // tituloOrden: toSave.title,
    }

    // await saveOrders(infoToMongo)
    await sendEmailNodeMailer(infoToGmail.toSendEmail, infoToGmail.subject, infoToGmail.msg)
    // console.log("infoToMongo infoToMongo infoToMongo", infoToMongo);

    // return toSave

}

async function SAVE_Chat__MongoService(chat) {
    await saveChat(chat)
}

module.exports = {
    findByUsername__MongoService,
    POST_Carritos__MongoService,
    SAVE_Chat__MongoService
}