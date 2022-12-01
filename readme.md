> Consigna: Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: messages y products.

> 1. Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB.

## **SERVER** mongod --dbpath C:\Users\PC2\Desktop\BACK43495MongoBase

## **CLIENTE** mongo

| Order | Commands                                                |
| :---: | :------------------------------------------------------ |
|   1   | mongod --dbpath C:\Users\PC2\Desktop\BACK43495MongoBase |
|   2   | mongo                                                   |
|   3   | show dbs                                                |
|   4   | use ecommerce                                           |
|   5   | db.messages.insert([                                    |
          {"email" : "Vic", "message" : "Hola", "fechaParsed" : "30/12/2022, 17:54:15" },
          {"email" : "Vic", "message" : "Hola", "fechaParsed" : "30/12/2022, 17:56:15" }]) |

| 6 | a|
| 7 | b|
| 8 | c|

> 2. Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990).

> 3. Listar todos los documentos en cada colección.
> 4. Mostrar la cantidad de documentos almacenados en cada una de ellas.
