const express = require('express')
const PORT = process.env.PORT || 9090
const faker = require('faker')
const { name, internet, random, products, commerce } = faker
const routerFaker = express.Router()

routerFaker.get('/', (req, res) => {
  const { quant } = req.query
  // res.json(generateURL(quant))

  console.log('/api/products-test/')
})
  
// name, title, thumbnail

function fakerGenerator(quantity) {
  let arrToReturn = []

  for (let i = 0; i < quantity; i++) {
    let objToRes = { id: i, name: name.firstName() }
    arrToReturn.push(objToRes)
  }

  return arrToReturn
}

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

generateURL(6)

module.exports = routerFaker
