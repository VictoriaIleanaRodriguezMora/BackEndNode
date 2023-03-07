const { saveUser } = require("../PERSISTENCIA/persistenciaMongo")

async function LoginRoot__ProfileUser__PassportService(req, res) {
    const { username, password } = await req.user;
    const user = { username, password };
    return await res.render("./pages/profileUser", { user });
}

async function SignUp__ProfileUser__PassportService(req, res) {
    const { username, password } = await req.user;
    const { phone, adress, age, avatar, gmail } = await req.body
    const user = { username, password, phone, adress, age, avatar, gmail };
    await saveUser(user)
    return await res.render("./pages/profileUser", { user });
}

module.exports = {
    LoginRoot__ProfileUser__PassportService,
    SignUp__ProfileUser__PassportService
}