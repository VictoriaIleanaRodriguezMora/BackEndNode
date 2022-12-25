const express = require('express')
const app = express()
const PORT = process.env.PORT || 9000
const faker = require('faker')
const { name, internet, random } = faker

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


app.listen(PORT, () => {
  console.log(`APP ON ${PORT}`)
})
