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
    // dataProds.map((e, i) => {
    //     console.log(e);
    //     // console.log(e.price);

    // })

})

const inputProds = () => {
    let priceProd = document.querySelector("#priceProd").value
    let thumbProd = document.querySelector("#thumbProd").value

    const contentInputs = { titleProd, priceProd, thumbProd }
    socket.emit("products", contentInputs)


}











// ----------------- Socket Products -----------------
