> Consigna: Deberás entregar el estado de avance de tu aplicación eCommerce Backend, que implemente un servidor de aplicación basado en la plataforma Node.js y el módulo express. El servidor implementará dos conjuntos de rutas agrupadas en routers, uno con la url base '/productos' y el otro con '/carrito'. El puerto de escucha será el 8080 para desarrollo y process.env.PORT para producción en glitch.com


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

El router base '/api/carrito' implementará tres rutas disponibles para usuarios y administradores:



## Crear una variable booleana administrador, cuyo valor configuraremos más adelante con el sistema de login. Según su valor (true ó false) me permitirá alcanzar o no las rutas indicadas. 
###     Este punto fue hecho al principio de cada hoja de router: routerApiCasrt.js y routerApiProducts.js

## En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. Ejemplo: { error : -1, descripcion: ruta 'x' método 'y' no autorizada }

### Este punto está el la línea 40 de la hoja server.js

Un producto dispondrá de los siguientes campos:  
id, timestamp , nombre, descripcion, código, foto, precio, stock.
El carrito de compras tendrá la siguiente estructura:
id, timestamp(carrito), productos: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }
El timestamp puede implementarse con Date.now() (es en el back)
Realizar la persistencia de productos y del carrito de compras en el filesystem.
