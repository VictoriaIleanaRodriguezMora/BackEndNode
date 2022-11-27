>> Consigna: Tomando como base las clases Contenedor en memoria y en archivos, desarrollar un nuevo contenedor con idénticos métodos pero que funcione sobre bases de datos, utilizando Knex para la conexión. Esta clase debe recibir en su constructor el objeto de configuración de Knex y el nombre de la tabla sobre la cual trabajará. Luego, modificar el desafío entregable de la clase 11”Chat con Websocket”, y: **cambiar la persistencia de los mensajes de filesystem a base de datos SQLite3. cambiar la persistencia de los productos de memoria a base de datos MariaDB/MysSql.**

Desarrollar también un codigo (x.js) que utilizando knex cree las tablas necesarias para la persistencia en cuestión (tabla mensajes en sqlite3 y tabla productos en mariaDb).
Codear un .js que cree las tablas.

>> Notas:
Definir una carpeta DB para almacenar la base datos SQLite3 llamada ecommerce


|  VERB  | BASE ROUTER    | Route                                                                   |
| :----: | -------------- | ----------------------------------------------------------------------- |
|  GET   | /api/products/ | http://localhost:8000/products                                          |
|  POST  | /api/products/ | http://localhost:8000/api/products/4c45bf45-d5ef-4d97-8332-592979ac63cd |
|  PUT   | /api/products/ | http://localhost:8000/api/products/4c45bf45-d5ef-4d97-8332-592979ac63cd |
| DELETE | /api/products/ | http://localhost:8000/api/products/4c45bf45-d5ef-4d97-8332-592979ac63cd |

To prove PUT in products {"title":"Tecla", "price": 50}
To prove POST in products { "title":"Transportador", "price": 540, "thumbnail":"https","id":"" }

|  VERB  | BASE ROUTER   | Route                                                                                                                |
| :----: | ------------- | -------------------------------------------------------------------------------------------------------------------- |
|  GET   | /api/carrito/ | http://localhost:8000/api/carrito                                                                                    |
|  GET   | /api/carrito/ | http://localhost:8000/api/carrito/0350e1fe-76bf-45ef-9cd2-35d3ef1bb6cb/products                                      |
|  POST  | /api/carrito/ | http://localhost:8000/api/carrito                                                                                    |
|  POST  | /api/carrito/ | http://localhost:8000/api/carrito/0350e1fe-76bf-45ef-9cd2-35d3ef1bb6cb/products                                      |
|  PUT   | /api/carrito/ | http://localhost:8000/api/products/4c45bf45-d5ef-4d97-8332-592979ac63cd                                              |
| DELETE | /api/carrito/ | http://localhost:8000/api/carrito/0350e1fe-76bf-45ef-9cd2-35d3ef1bb6cb/products/ff445634-c22d-49d9-be4f-ac0d53251dea |

To prove PUT {"title":"Tecla", "price": 50}

To prove 1st POST in carritos {
"id": "",
"timestamp": "20/11/2022, 18:38:39",
"products": {
"code": "xxx",
"description": "Descripcion",
"photo": "https://",
"name": "libro",
"price": 200,
"stock": 10,
"timestamp": "20/11/2022, 18:38:39",
"id": ""
}
}

To prove 2nd POST in carritos
"products": {
"code": "xxx",
"description": "Descripcion",
"photo": "https://",
"name": "libro",
"price": 200,
"stock": 10,
"timestamp": "20/11/2022, 18:38:39",
"id": ""
}



### Crear una variable booleana administrador, cuyo valor configuraremos más adelante con el sistema de login. Según su valor (true ó false) me permitirá alcanzar o no las rutas indicadas. 
####    Este punto fue hecho al principio de cada hoja de router: routerApiCasrt.js y routerApiProducts.js

### En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. Ejemplo: { error : -1, descripcion: ruta 'x' método 'y' no autorizada }

#### Este punto está el la línea 40 de la hoja server.js

