// FRONT
//Este index, está en la carpeta PUBLICA, entonce por eso se ve desde el navegador.
const socket = io() //En esta linea se conecta al servidor, y activa el mensaje que el servidor (.io), tiene preparado para ejecutar cuando el socket se conecto

// Cliente
socket.on('connect', (data) => {
  // Cdo llegue a MI SOCKET, un mns de *conecion*, dejo preparado este mensaje. Esta funcionalidad
  //  Cuando el servidor se conecta, se muestra este mensaje
  console.log(`Cliente: Me conecté`) //Este log se ve en el navegador
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

socket.on('chatPage', (chatBack) => {
  const {    percentageCalculator  } = require('../FAKER/percentageCalculator/percentageCalculator.js')
//   console.log(percentageCalculator())
  console.log('okiuyfjhytfukhylirdhgldifxuhdglisrtuhjgloiuht')

  console.log('Chat from BACK: ', chatBack)

  const divChatPage = document.querySelector('#chatPage')

  const p = chatBack
    .map((e) => {
      return `
        <p>
            <span class="email"> ${e.email} </span>
            <span class="date"> [${e.fechaParsed}] </span>
            <span class="message"> : ${e.message} </span>
        </p>
        `
    })
    .join(' ')

  divChatPage.innerHTML = p
})

const inputChat = () => {
  const email = document.querySelector('#emailChat').value
  const message = document.querySelector('#messageChat').value
  const fecha = new Date()
  const fechaParsed = fecha.toLocaleString('en-GB')

  const userChat = { email, message, fechaParsed }

  socket.emit('chatPage', userChat)
}

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
