const express = require('express')
const routerFork = express.Router()

routerFork.get('/info', (req, res) => {
    console.log("https://localhost:7070/api/info");
    const obj = {
        nodeV: process.version,
        memoryUsage: process.memoryUsage().rss,
        operatingSystem: process.platform,
        folderProject: process.cwd(),
        idProcess: process.pid
    }
    res.json(obj)
})

// FORK
const { fork } = require("child_process");
// http://localhost:7070/api/randoms?cant=100
routerFork.get("/randoms", async (req, res) => {
    const { cant } = req.query
    console.log("http://localhost:7070/api/randoms?cant=100");
    let forkHijoCalcular = fork("./FORK/calcularFORK.js");
    forkHijoCalcular.send(cant || 1000);
    forkHijoCalcular.on("message", (numFromSonFork) => {
        console.log(numFromSonFork);
        res.json(numFromSonFork)
    });
});

// FORK

module.exports = routerFork