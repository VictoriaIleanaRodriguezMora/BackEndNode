const {
    MongoUsersInstance,
    MongoCarritosInstance
} = require("./servicioSchemas.js")


async function findByUsername__MongoService(req, res) {
    const { username, password } = req.user;

    const userFindByUsername = await MongoUsersInstance.getByUsername(username)

    const { phone, adress, age, avatar, gmail } = await userFindByUsername[0]

    const user = { username, password, phone, adress, age, avatar, gmail };

    return res.render("./pages/profileUser", { user });

}



module.exports = {
    findByUsername__MongoService
}