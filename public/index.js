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

// socket.on('chatPage', (data) => {
//   // NORMALIZR
//   // // logger.info('NORMALIZADA', data)
//   let denormalizado = denormalizarMensajes(data[0])
//   let compressionData = data[1]
//   // // logger.info('DESNORMALIZADA', denormalizado)
//   // NORMALIZR
//   const chatPage = document.querySelector('#chatPage')

//   const p = denormalizado
//     .map((e) => {
//       return `
//         <p> 
//           <span class="email"> ${e.author.nombre} </span>
//           <span class="date"> [${e.fechaParsed}] </span>
//           <span class="message"> : ${e.text} </span>
//           <span class="avatar"> : ${e.author.avatar} </span>
//         <p/>

//         `
//     })
//     .join(' ')

//   chatPage.innerHTML = p
//   const spanCompression = document.querySelector('#compression')
//   spanCompression.textContent = compressionData
// })

// async function enviarMsg() {
//   const email = document.querySelector('#emailChat').value
//   const nombre = document.querySelector('#nombreChat').value
//   const apellido = document.querySelector('#apellidoChat').value
//   const edad = document.querySelector('#edadChat').value
//   const alias = document.querySelector('#aliasChat').value
//   const avatar = document.querySelector('#avatarChat').value
//   const text = document.querySelector('#messageChat').value
//   const fechaParsed = new Date().toLocaleString('en-GB')

//   const userChat = {
//     author: {
//       id: Math.random(),
//       email: email,
//       nombre: nombre,
//       apellido: apellido,
//       edad: edad,
//       alias: alias,
//       avatar: avatar,
//     },
//     text: text,
//     fechaParsed: fechaParsed,
//   }
//   await socket.emit('mnsChat', userChat)
// }

// --------- CHAT ---------


// ----------- FAKER - NORMALIZR -----------

/* socket.on('fakerData', async (dataProds) => {
  // logger.debug("frontFAKER");
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

}) */

// ----------- FAKER - NORMALIZR -----------

// --------- CARRITO ---------

// ----------------- SOCKET PRODUCTS -----------------
let stockProductos
// async function traerProds(){
socket.on('products', (dataProds) => {
  // La dataProds es un [{...}, {...}]
  // // logger.info('Products from BACK: ', dataProds)
  stockProductos = dataProds
  stockProductos.forEach((producto) => {
    // console.log(producto["_id"]); // este si funciona
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
      <img src=${producto.thumbnail} alt= "">
      <h3>${producto.title}</h3>
      <p class="precioProducto">Precio:$ ${producto.price}</p>
      <button id="agregar${producto._id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
  
      `
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto._id}`)

    boton.addEventListener('click', () => {
      agregarAlCarrito(producto._id)
    })
  })
})
// }
// traerProds()
// ----------------- SOCKET PRODUCTS -----------------

const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')

const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []


const agregarAlCarrito = (prodId) => {

  const existe = carrito.some(prod => prod._id === prodId)

  if (existe) {
    const prod = carrito.map(prod => {
      if (prod._id === prodId) {
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod._id === prodId)
    carrito.push(item)
  }

  actualizarCarrito()
}

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod._id === prodId)

  const indice = carrito.indexOf(item)

  carrito.splice(indice, 1)
  actualizarCarrito()
  // logger.debug(carrito)
}

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = ""
  carrito.forEach((prod) => {
    const div = document.createElement('div')
    div.className = ('productoEnCarrito')
    div.innerHTML = `
    <p>${prod.title}</p>
    <p>Precio:$${prod.price}</p>
    <button onclick="eliminarDelCarrito(${prod._id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
    `

    contenedorCarrito.appendChild(div)

    localStorage.setItem('carrito', JSON.stringify(carrito))

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + parseFloat(prod.price), 0)
  })

  contadorCarrito.innerText = carrito.length

}

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


botonAbrir.addEventListener('click', () => {
  contenedorModal.classList.toggle('modal-active')
})

botonCerrar.addEventListener('click', () => {
  contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) => {
  contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
  event.stopPropagation() //cuando clickeo sobre el modal se finaliza la propagacion del click a los elementos
  //padre
})

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
    actualizarCarrito()
  }
})
botonVaciar.addEventListener('click', () => {
  carrito.length = 0
  actualizarCarrito()
})

