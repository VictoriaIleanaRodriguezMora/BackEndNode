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
function denormalizarMensajes(ListMessages) { 
  console.log("lllllllllllllllllllllllllllllllllllllllllllllllllllllllllll");
  console.log(ListMessages.entities);
  const authorSchema = new normalizr.schema.Entity('authors', { idAttribute: 'email' });
  const messageSchema = new normalizr.schema.Entity('message', {
    author: authorSchema,
  }, { idAttribute: "email" })

  const denormalizedListMessages = normalizr.denormalize(ListMessages.result, [messageSchema], ListMessages.entities);
  // return denormalizedListMessages
}


//  --- NORMALIZR --- NORMALIZR --- NORMALIZR
const inputChat = () => {
  const email = document.querySelector('#emailChat').value
  const message = document.querySelector('#messageChat').value
  const fecha = new Date()
  const fechaParsed = fecha.toLocaleString('en-GB')

  const userChat = { email, message, fechaParsed }

  socket.emit('chatPage', userChat)
}

socket.on('chatPage', async (chatBack) => {
  console.log('Chat from BACK: ', chatBack)
  const divChatPage = document.querySelector('#chatPage')

  let des = await denormalizarMensajes(chatBack)
  console.log("des",des);

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

  // console.log('prodsDesafio11', dataProds)
})

// ----------- FAKER - NORMALIZR -----------
