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
/* let stockProductos = [
  { id: 1, nombre: "Buzo 1", tipo: "buzo", cantidad: 1, desc: "", precio: 1200, talle: "L", img: 'a' },
  { id: 2, nombre: "Buzo 2", tipo: "buzo", cantidad: 1, desc: "", precio: 1100, talle: "L", img: 'a' },
  { id: 3, nombre: "Buzo 3", tipo: "buzo", cantidad: 1, desc: "", precio: 1200, talle: "M", img: 'a' },
  { id: 4, nombre: "Buzo 4", tipo: "b uzo", cantidad: 1, desc: "", precio: 1400, talle: "M", img: 'a' },
  { id: 5, nombre: "Buzo 5", tipo: "buzo", cantidad: 1, desc: "", precio: 1200, talle: "S", img: 'a' },
  { id: 6, nombre: "Buzo 6", tipo: "buzo", cantidad: 1, desc: "", precio: 1500, talle: "S", img: 'a' },
  { id: 7, nombre: "Remera 1", tipo: "remera", cantidad: 1, desc: "", precio: 500, talle: "L", img: 'apg' },
  { id: 8, nombre: "Remera 2", tipo: "remera", cantidad: 1, desc: "", precio: 500, talle: "L", img: 'apg' },
  { id: 9, nombre: "Remera 3", tipo: "remera", cantidad: 1, desc: "", precio: 500, talle: "M", img: 'apg' },
  { id: 10, nombre: "Remera 4", tipo: "remera", cantidad: 1, desc: "", precio: 700, talle: "M", img: 'apg' },
  { id: 11, nombre: "Remera 5", tipo: "remera", cantidad: 1, desc: "", precio: 700, talle: "S", img: 'apg' },
  { id: 12, nombre: "Remera 6", tipo: "remera", cantidad: 1, desc: "", precio: 700, talle: "S", img: 'apg' },
  { id: 13, nombre: "Camisa 1", tipo: "camisa", cantidad: 1, desc: "", precio: 900, talle: "L", img: 'apg' },
  { id: 14, nombre: "Camisa 2", tipo: "camisa", cantidad: 1, desc: "", precio: 1400, talle: "S", img: 'apg' },
  { id: 15, nombre: "Camisa 3", tipo: "camisa", cantidad: 1, desc: "", precio: 7000, talle: "L", img: 'apg' },
  { id: 16, nombre: "Camisa 4", tipo: "camisa", cantidad: 1, desc: "", precio: 777, talle: "S", img: 'apg' },
  { id: 17, nombre: "Camisa 5", tipo: "camisa", cantidad: 1, desc: "", precio: 234, talle: "S", img: 'apg' },
  { id: 18, nombre: "Camisa 6", tipo: "camisa", cantidad: 1, desc: "", precio: 155600, talle: "M", img: 'apg' },
  { id: 19, nombre: "Pantalon 1", tipo: "pantalon", cantidad: 1, desc: "", precio: 1600, talle: "L", img: 'a.jpg' },
  { id: 20, nombre: "Pantalon 2", tipo: "pantalon", cantidad: 1, desc: "", precio: 3200, talle: "L", img: 'a.jpg' },
  { id: 21, nombre: "Pantalon 3", tipo: "pantalon", cantidad: 1, desc: "", precio: 2300, talle: "M", img: 'a.jpg' },
  { id: 22, nombre: "Pantalon 4", tipo: "pantalon", cantidad: 1, desc: "", precio: 5600, talle: "M", img: 'a.jpg' },
  { id: 23, nombre: "Pantalon 5", tipo: "pantalon", cantidad: 1, desc: "", precio: 1700, talle: "S", img: 'a.jpg' },
  { id: 24, nombre: "Pantalon 6", tipo: "pantalon", cantidad: 1, desc: "", precio: 800, talle: "S", img: 'a.jpg' },
] */


// ----------------- SOCKET PRODUCTS -----------------
let stockProductos
// async function traerProds(){
socket.on('products', (dataProds) => {
  // La dataProds es un [{...}, {...}]
  // // logger.info('Products from BACK: ', dataProds)
  stockProductos = dataProds
  console.log("stockProductos", stockProductos);
  stockProductos.forEach((producto) => {
    console.log(producto);
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
      <img src=${producto.img} alt= "">
      <h3>${producto.nombre}</h3>
      <p>${producto.desc}</p>
      <p>Talle: ${producto.talle}</p>
      <p class="precioProducto">Precio:$ ${producto.precio}</p>
      <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
  
      `
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
      agregarAlCarrito(producto.id)
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

  const existe = carrito.some(prod => prod.id === prodId)

  if (existe) {
    const prod = carrito.map(prod => {
      if (prod.id === prodId) {
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === prodId)
    carrito.push(item)
  }

  actualizarCarrito()
}

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId)

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
    <p>${prod.nombre}</p>
    <p>Precio:$${prod.precio}</p>
    <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
    <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
    `
    contenedorCarrito.appendChild(div)
    localStorage.setItem('carrito', JSON.stringify(carrito))
  })
  contadorCarrito.innerText = carrito.length
  // logger.debug(carrito)
  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
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



// renderizarProds()
// traerProds()