const twilio = require('twilio')

const accountSid = 'AC1668abc4b67f83be17c91e46c1368285'
const authToken = '715277e1e408480603b21aeed4001b24'

const client = twilio(accountSid, authToken)

async function twilioo() {
    try {
        const message = await client.messages.create({
            body: 'Hola soy un SMS desde Node.js!',
            from: '+12053044674',
            to: '+541133990583'
        })
        console.log(message)
    } catch (error) {
        console.log(error)
    }
}

twilioo()