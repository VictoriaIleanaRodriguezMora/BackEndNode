const faker = require('faker')
const { name, internet, random, products, commerce } = faker

function generateURL(num = 5) {
  let element = internet.domainName()
  let toReturn = []

  for (let i = 0; i < num; i++) {
    let objToRes = {
      title: commerce.product(),
      price: commerce.price(),
      thumbnail: internet.domainName(),
    }

    toReturn.push(objToRes)
  }

  // console.log(toReturn)
  return toReturn
}

module.exports = { generateURL }
