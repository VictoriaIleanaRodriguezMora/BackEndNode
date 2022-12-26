const express = require('express')
const app = express()
const PORT = process.env.PORT || 9000
const faker = require('faker')
const { name, internet, random, products, commerce } = faker

const fs = require('fs')

app.use(express.json())

app.get('/test', (req, res) => {
  const { quant } = req.query
  const quantQuery = quant || 10
  res.send(fakerGenerator(quantQuery))
})

function fakerGenerator(quantity) {
  let arrToReturn = []

  for (let i = 0; i < quantity; i++) {
    let objToRes = { id: i, name: name.firstName() }
    arrToReturn.push(objToRes)
  }
  return arrToReturn
}
// http://localhost:9000/test?quant=15

let str = 'NAME;SURNAME;EMAIL:JOB'
for (let i = 0; i < 100; i++) {
  str +=
    name.firstName() +
    ';' +
    name.lastName() +
    ';' +
    internet.email() +
    ';' +
    name.jobTitle() +
    '\n'
}

fs.writeFile('./test.csv', str, (e) => {
  if (e) () => console.log(e)
  else console.log('succesfully')
})

app.listen(PORT, () => {
  console.log(`APP ON ${PORT}`)
})
