import faker from 'faker'
faker.locale = 'es'
const { name, internet, random } = faker
import { writeFile } from 'fs'

let str = 'NOMBRE;APELLIDO;EMAIL;TRABAJO;LUGAR\n'

for (let i = 0; i < 100; i++) {
   str += name.firstName() +
      ';' + name.lastName() +
      ';' + internet.email() +
      ';' + name.jobTitle() +
      ';' + random.locale() +
      '\n'
}

writeFile('./test.csv', str, err => {
   if (err) console.log(err);
   console.log('archivo guardado')
})


//  PRACTICA
// const express = require("express");
import express from 'express';
const app = express();
const port = 9090;

app.get("/", (req, res) => {
   res.send("Hello World!");
});



app.use(express.json());

app.get("/test", (req, res) => {
   // http://localhost:9090/test?cant=100
   const { cant } = req.query
   res.send(data(cant))
})


function data(aQuant) {
   let arr = []
   const cantidad = aQuant || 15
   for (let i = 0; i < aQuant; i++) {
      let obj = { id: i, name: name.firstName() }
      arr.push(obj)

   }


   return arr
}

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
});