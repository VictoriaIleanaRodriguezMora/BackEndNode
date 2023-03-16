const faker = require('faker')
const { name, internet, random, lorem, commerce } = faker

function generateCarts() {
/*  */
    let objCart = {
      title: commerce.product(),
      products: {
          price: commerce.price(),
          photo: internet.domainName(),
          description: lorem.words(),
          name: commerce.product(),
          date: new Date().toLocaleString("en-GB"),
      },
      date: new Date().toLocaleString("en-GB")
    }
  console.log("objCart", objCart);
    return objCart
}
generateCarts()
module.exports = generateCarts
