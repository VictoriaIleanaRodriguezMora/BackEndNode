const socket = io();

/* chat */



socket.on('connect', () => {
  console.log('me conecte!');
});

function denormalizarMensajes(ListMessages) {
  const authorSchema = new normalizr.schema.Entity('authors', { idAttribute: 'id' });
  const messageSchema = new normalizr.schema.Entity('message', { author: authorSchema, }, { idAttribute: "_id" })

  const denormalizedListMessages = normalizr.denormalize(ListMessages.result, [messageSchema], ListMessages.entities);
  return denormalizedListMessages
}

socket.on('msg-list', (data) => {
  let html = '';
  console.log("NORMALIZADA", data)
  let denormalizado = denormalizarMensajes(data[0]);
  console.log("DESNORMALIZADA", denormalizado)
  denormalizado.forEach((e) => {
    html += `
        <p> 
          <span class="email"> ${e.author.nombre} </span>
          <span class="date"> [${e.fechaParsed}] </span>
          <span class="message"> : ${e.text} </span>
          <span class="avatar"> : ${e.author.avatar} </span>
        <p/>

        `;
  });



});

async function enviarMsg() {
  const email = document.getElementById('emailChat').value;
  const nombre = document.getElementById('nombreChat').value;
  const apellido = document.getElementById('apellidoChat').value;
  const edad = document.getElementById('edadChat').value;
  const alias = document.getElementById('aliasChat').value;
  const avatar = document.getElementById('avatarChat').value;
  const text = document.getElementById('messageChat').value;
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
  await socket.emit('msg', userChat)

}

/* chat */




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






// percentageCalculator
async function percentageCalculator(weightWithoutNormalize = 2653, weightNormalize = 1871) {
  let theCount = Math.round((weightNormalize * 100) / weightWithoutNormalize)
  let finalNum = 100 - theCount
  console.log(`Se ganó un ${finalNum}%`)
  return finalNum
}