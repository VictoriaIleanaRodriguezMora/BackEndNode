const express = require("express");
const app = express();
app.enable("trust proxy");
//app.use(express.static('public'))
const PORT = parseInt(process.argv[2]) || 8080;
app.get("/datos", (req, res) => {
  console.log(`port: ${PORT} -> Fyh: ${Date.now()}`);
  res.send(`Servidor express <span style="color:blueviolet;">(Nginx)</span> en ${PORT} - 
    <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`);
});
app.get("/api/randoms", (req, res) => {
  console.log(`api/randoms`);
  res.send(`api/randoms ${PORT} - 
    <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`);
});

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
