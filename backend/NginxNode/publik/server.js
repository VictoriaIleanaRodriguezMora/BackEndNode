// YARGS - PORT
const yargs = require("yargs")(process.argv.slice(2))
const args = yargs.default({ PORT: 7070 }).argv
const PORT = process.env.PORT || args.PORT
// nodemon server.js --PORT 5050
console.log(`Puerto desde YARGS (${(args.PORT)})`);
// YARGS - PORT
const express = require('express')
const { fork } = require("child_process");

const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer)

const dotenv = require('dotenv')
dotenv.config()

app.get("/api/randoms/", async (req, res) => {
  const { cant } = req.query
  console.log("http://localhost:7070/api/randoms?cant=100");
  let forkHijoCalcular = fork("./FORK/calcularFORK.js");
  forkHijoCalcular.send(cant || 1000);
  forkHijoCalcular.on("message", (numFromSonFork) => {
      console.log(numFromSonFork);
      res.json(numFromSonFork)
  });
});

