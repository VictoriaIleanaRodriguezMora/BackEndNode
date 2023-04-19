const socket = io()

socket.on('connect', () => {

})

// ----------------- Socket Chat -----------------

socket.on("chatPage", (chatBack) => {

  console.log("Chat from BACK: ", chatBack);

  const divChatPage = document.querySelector("#chatPage")

  const p = chatBack.map((e) => {
    return (`
      <p>
          <span class="email"> Vos: </span>
          <span class="date"> [${e.fechaParsed}] </span>
          <span class="message"> : ${e.mensaje} </span>
      </p>
      `)
  }).join(" ")

  divChatPage.innerHTML = p

})

const inputChat = () => {
  const email = "Vos: "
  const mensaje = document.querySelector("#messageChat").value
  const fecha = new Date()
  const fechaParsed = fecha.toLocaleString("en-GB")
  const userChat = { email, mensaje, fechaParsed }

  socket.emit("chatPage", userChat)
}

// ----------------- Socket Chat -----------------

const inputProds = () => {
  const title = document.querySelector('#titleProd').value
  const price = document.querySelector('#priceProd').value
  const thumbnail = document.querySelector('#thumbProd').value
  const categoria = document.querySelector('#categoria').value

  const contentInputs = { title, price, thumbnail }
  socket.emit('products', contentInputs)
}

const vercarrito = document.querySelector("#ver-carrito")
const spanWarning = document.querySelector("#warning")
let gmail, username

vercarrito.addEventListener("click", async function () {
  let carrito = await JSON.parse(localStorage.getItem('carrito'))

  // Traigo el JSON con la info del usuario
  await fetch('/auth/profileuser')
    .then(response => response.json())
    .then(data => { return gmail = data.gmail });

  // Emito el BACK. El carrito y el gmail

  if (carrito === null) {
    spanWarning.textContent = "Para generar una orden debes tener al menos 1 producto en el carrito"
  } else {
    spanWarning.textContent = ""

    const toBack = [{ carrito, gmail }]
    socket.emit("carritos", await toBack)
    setTimeout(() => { window.location.href = "/products/confirmar-orden"; }, 1000);

  }


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
  stockProductos = dataProds
  stockProductos.forEach((producto) => {
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
  const item = carrito.find((prod) => prod._id === prodId)
  const indice = carrito.indexOf(item)
  carrito.splice(indice, 1)
  actualizarCarrito()
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