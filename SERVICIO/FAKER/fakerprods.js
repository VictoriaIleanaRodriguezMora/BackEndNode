const faker = require('faker')
const { name, internet, random, lorem, commerce } = faker

async function generateProds(num = 10) {
    let toReturn = []
    for (let i = 0; i < num; i++) {

        let prod = {
            title: commerce.product(),
            price: commerce.price(),
            // description: lorem.words(),
            // date: new Date().toLocaleString("en-GB"),
        }
        await toReturn.push(prod)

    }
    return toReturn
}
module.exports = { generateProds }
