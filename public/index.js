// FRONT
//Este index, está en la carpeta PUBLICA, entonce por eso se ve desde el navegador.
const socket = io(); //En esta linea se conecta al servidor, y activa el mensaje que el servidor (.io), tiene preparado para ejecutar cuando el socket se conecto

// Cliente
socket.on("connect", (data) => { // Cdo llegue a MI SOCKET, un mns de *conecion*, dejo preparado este mensaje. Esta funcionalidad
    //  Cuando el servidor se conecta, se muestra este mensaje
    console.log(`Cliente: Me conecté`); //Este log se ve en el navegador
})

// ----------------- Socket Products -----------------
socket.on("products", (dataProds) => {
    // La dataProds es un [{...}, {...}]
    console.log("Products from BACK: ", dataProds);
    const tBody = document.querySelector("#tbodyProds")

    let tr = dataProds.map((item) => {
        console.log(item);
        return (`
        <tr>
        <td>${item.title}</td>
        <td>${item.price}</td>
        <td>${item.thumbnail}</td>
        </tr>
        `)

    }).join(" ")

    tBody.innerHTML = tr

})

const inputProds = () => {

    const title = document.querySelector("#titleProd").value
    const price = document.querySelector("#priceProd").value
    const thumbnail = document.querySelector("#thumbProd").value

    const contentInputs = { title , price, thumbnail }

    socket.emit("products", contentInputs)


}











// ----------------- Socket Products -----------------
