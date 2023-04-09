console.log("HOLA");
const socket = io()

socket.on('connect', () => {

})

const inputProds = () => {
  const title = document.querySelector('#titleProd').value
  const price = document.querySelector('#priceProd').value
  const thumbnail = document.querySelector('#thumbProd').value
  const categoria = document.querySelector('#categoria').value

  const contentInputs = { title, price, thumbnail }
  socket.emit('products', contentInputs)
}

const vercarrito = document.querySelector("#ver-carrito")
vercarrito.addEventListener("click", function () {
  console.log("a");
})

// --------- CARRITO ---------

const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

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


// ----------------- SOCKET PRODUCTS -----------------
let stockProductos
// async function traerProds(){
socket.on('products', (dataProds) => {
  // La dataProds es un [{...}, {...}]
  console.log(dataProds);
  stockProductos = dataProds
  stockProductos.forEach((producto) => {
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

// ----------------- SOCKET PRODUCTS -----------------


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
  console.log(prodId);
  const item = carrito.find((prod) => prod._id === prodId)
  console.log(item);
  const indice = carrito.indexOf(item)
  console.log(indice);
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
    <button onclick=eliminarDelCarrito('${prod._id}') class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
    `

    contenedorCarrito.appendChild(div)

    localStorage.setItem('carrito', JSON.stringify(carrito))
    if (carrito.length == 0) {
      precioTotal.innerText = 0
    } else {
      precioTotal.innerText = carrito.reduce((acc, prod) => acc + parseFloat(prod.price), 0)
    }
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
  event.stopPropagation()
})