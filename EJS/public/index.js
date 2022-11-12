const socket = io() //En esta linea se conecta al servidor, y activa el mensaje que el servidor (.io), tiene preparado para ejecutar cuando el socket se conecto
//El socket soy yo, es mi conexion
// Cliente
socket.on("connect", () => { // Cdo llegue a MI SOCKET, un mns de *conecion*, dejo preparado este mensaje. Esta funcionalidad
    //  Cuando el servidor se conecta, se muestra este mensaje
    console.log(`Cliente: Me conecté`); //Este log se ve en el navegador
    //El parametro de DATA, es el socket.emit del servidor
})