const socket = io()

socket.on('connect', () => {

})

// --------- CHAT ---------

function denormalizarMensajes(ListMessages) {
  const authorSchema = new normalizr.schema.Entity('authors', {
    idAttribute: 'id',
  })
  const messageSchema = new normalizr.schema.Entity(
    'message',
    { author: authorSchema },
    { idAttribute: '_id' },
  )

  const denormalizedListMessages = normalizr.denormalize(
    ListMessages.result,
    [messageSchema],
    ListMessages.entities,
  )
  return denormalizedListMessages
}

socket.on('chatPage', (data) => {
  // NORMALIZR
  // logger.info('NORMALIZADA', data)
  let denormalizado = denormalizarMensajes(data[0])
  let compressionData = data[1]
  // logger.info('DESNORMALIZADA', denormalizado)
  // NORMALIZR
  const chatPage = document.querySelector('#chatPage')

  const p = denormalizado
    .map((e) => {
      return `
        <p> 
          <span class="email"> ${e.author.nombre} </span>
          <span class="date"> [${e.fechaParsed}] </span>
          <span class="message"> : ${e.text} </span>
          <span class="avatar"> : ${e.author.avatar} </span>
        <p/>

        `
    })
    .join(' ')

  chatPage.innerHTML = p
  const spanCompression = document.querySelector('#compression')
  spanCompression.textContent = compressionData
})

async function enviarMsg() {
  const email = document.getElementById('emailChat').value
  const nombre = document.getElementById('nombreChat').value
  const apellido = document.getElementById('apellidoChat').value
  const edad = document.getElementById('edadChat').value
  const alias = document.getElementById('aliasChat').value
  const avatar = document.getElementById('avatarChat').value
  const text = document.getElementById('messageChat').value
  const fechaParsed = new Date().toLocaleString('en-GB')

  const userChat = {
    author: {
      id: Math.random(),
      email: email,
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      alias: alias,
      avatar: avatar,
    },
    text: text,
    fechaParsed: fechaParsed,
  }
  await socket.emit('mnsChat', userChat)
}

// --------- CHAT ---------

// ----------------- SOCKET PRODUCTS -----------------
socket.on('products', (dataProds) => {
  // La dataProds es un [{...}, {...}]
  // logger.info('Products from BACK: ', dataProds)
  const tBody = document.querySelector('#tbodyProds')

  let tr = dataProds
    .map((item) => {
      // logger.info(item);
      return `
        <tr>
        <td>${item.title}</td>
        <td>${item.price}</td>
        <td>${item.thumbnail}</td>
        </tr>
        `
    })
    .join(' ')

  tBody.innerHTML = tr
})

const inputProds = () => {
  const title = document.querySelector('#titleProd').value
  const price = document.querySelector('#priceProd').value
  const thumbnail = document.querySelector('#thumbProd').value

  const contentInputs = { title, price, thumbnail }

  socket.emit('products', contentInputs)
}

// ----------------- SOCKET PRODUCTS -----------------

// ----------- FAKER - NORMALIZR -----------

socket.on('fakerData', async (dataProds) => {
  console.log("frontFAKER");
  const tBody = document.querySelector('#tbodyFaker')

  let tr = dataProds
    .map((item) => {
      return `
        <tr>
        <td>${item.title}</td>
        <td>${item.price}</td>
        <td>${item.thumbnail}</td>
        </tr>
        `
    })
    .join(' ')

  tBody.innerHTML = tr

})

// ----------- FAKER - NORMALIZR -----------
