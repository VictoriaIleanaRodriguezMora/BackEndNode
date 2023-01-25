const express = require('express')
const routerFork = express.Router()

// FORK
const http = require("http");
const { fork } = require("child_process");
// const server = http.createServer();
app.on("request", (req, res) => {
  console.log("hi");
  if (url == "/api/randoms") {
    let computo = fork("./FORK/calcularFORK.js");
    computo.send("start");
    computo.on("message", (msg) => {
      res.end(msg)
    });
  } else if (url == "/") {
    res.end(msg)

  }
});

// const PORT_FORK = 6000;
/* server.listen(PORT, (err) => {
  if (err) throw new Error(`Error en servidor: ${err}`);
  console.log(`FORK ON http://localhost:${PORT}`);
}); */
// FORK

module.exports = routerFork