// FRONT
const socket = io()

// Cliente
socket.on('connect', (data) => {
  console.log(`Cliente: Me conecté`)
})

// ----------------- Socket Products -----------------
socket.on('products', (dataProds) => {
  // La dataProds es un [{...}, {...}]
  console.log('Products from BACK: ', dataProds)
  const tBody = document.querySelector('#tbodyProds')

  let tr = dataProds
    .map((item) => {
      // console.log(item);
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

// ----------------- Socket Products -----------------

// ----------------- Socket Chat -----------------

//  --- NORMALIZR --- NORMALIZR --- NORMALIZR
/* 
const authorSchema = new schema.Entity(
  'authors',
  {},
  { idAttribute: 'email' },
)
const messageSchema = new schema.Entity('messages', {
  author: authorSchema,
}) // es cada objetito
const chatSchema = new schema.Entity('chats', {
  messages: [messageSchema],
}) // es el array de objetos */

//  --- NORMALIZR --- NORMALIZR --- NORMALIZR
const inputChat = () => {
  const email = document.querySelector('#emailChat').value
  const text = document.querySelector('#messageChat').value
  const nombre = document.querySelector('#nombreChat').value
  const alias = document.querySelector('#aliasChat').value
  const apellido = document.querySelector('#apellidoChat').value
  const edad = document.querySelector('#edadChat').value
  const avatar = document.querySelector('#avatarChat').value
  const url = document.querySelector('#urlChat').value

  const fechaParsed = new Date().toLocaleString('en-GB')

  const userChat = {
    author: {
      email: email,
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      alias: alias,
      avatar: avatar,
      url: url,
    },
    text: text,
    fechaParsed: fechaParsed,
  }
  socket.emit('chatPage', userChat)
  socket.emit('testChat', userChat)
}

socket.on('chatPage', (chatBack) => {
  console.log('Chat from BACK: ', chatBack)
  const divChatPage = document.querySelector('#chatPage')
  for (const key in chatBack) {
    console.log(chatBack["entities"]["authors"])
  }
// tengo que desnormalizr la data, pero no puedooo
  // const p = chatBack
  //   .map((e) => {
  //     return `
  //       <p>
  //           <span class="email"> ${e.author.email} </span>
  //           <span class="date"> [${e.fechaParsed}] </span>
  //           <span class="message"> : ${e.text} </span>
  //           <span> : ${e.author.avatar} </span>

  //       </p>
  //       `
  //   })
  //   .join(' ')

  // divChatPage.innerHTML = p
})

// ----------------- Socket Chat -----------------

// ----------- FAKER - NORMALIZR -----------

socket.on('prodsDesafio11', async (dataProds) => {
  const tBody = document.querySelector('#tbodyProdsTest')

  let tr = dataProds
    .map((item) => {
      // console.log(item);
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

  console.log('prodsDesafio11', dataProds)
  //   socket.io.emit(dataProds)
})

// ----------- FAKER - NORMALIZR -----------
