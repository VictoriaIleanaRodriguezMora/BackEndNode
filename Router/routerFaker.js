const express = require('express')
const faker = require('faker')
const routerFaker = express.Router()

const generateURL = require('../FAKER/fakerGeneratorProds/fakerGeneratorProds.js')

routerFaker.get('/', (req, res) => {
  const { quant } = req.query
  res.json(generateURL(quant))

  console.log('/api/products-test/')
})

module.exports = routerFaker
