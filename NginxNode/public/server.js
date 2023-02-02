const express = require('express')
const { fork } = require("child_process");
const app = express();
app.enable("trust proxy");
const dotenv = require('dotenv')
dotenv.config()
//app.use(express.static('public'))

const PORT = parseInt(process.argv[2]) || 8080;
app.get("/datos", (req, res) => {
  console.log(`port: ${PORT} -> Fyh: ${Date.now()}`);
  res.send(`Servidor express <span style="color:blueviolet;">(Nginx)</span> en ${PORT} - 
    <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`);
});

app.get("/api/random/", async (req, res) => {
  const { cant } = req.query
  console.log("http://localhost:7070/api/randoms?cant=100");
  let forkHijoCalcular = fork("./FORK/calcularFORK.js");
  forkHijoCalcular.send(cant || 100);
  forkHijoCalcular.on("message", (numFromSonFork) => {
      console.log(numFromSonFork);
      res.json(numFromSonFork)
  });
  // res.json("hh")
});

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
