const faker = require('faker')
const { name, internet, random, products, commerce } =  faker

async function generateURL(num = 5) {
  let element = await internet.domainName()
  let toReturn = []

  for (let i = 0; i < num; i++) {
    let objToRes = {
      title: await commerce.product(),
      price: await commerce.price(),
      thumbnail: await internet.domainName(),
    }
     toReturn.push(objToRes)
  }

  // console.log(toReturn)
  return  toReturn
}

module.exports = { generateURL }
