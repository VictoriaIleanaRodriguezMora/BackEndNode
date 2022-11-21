>>Consigna: Deberás entregar el estado de avance de tu aplicación eCommerce Backend, que implemente un servidor de aplicación basado en la plataforma Node.js y el módulo express. El servidor implementará dos conjuntos de rutas agrupadas en routers, uno con la url base '/productos' y el otro con '/carrito'. El puerto de escucha será el 8080 para desarrollo y process.env.PORT para producción en glitch.com


>>Aspectos a incluir en el entregable: 

## El router base '/api/productos' implementará cuatro funcionalidades:
## GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible ## para usuarios y administradores (middleware))
## POST: '/' - Para incorporar productos al listado (disponible para administradores)
## PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
## DELETE: '/:id' - Borra un producto por su id (disponible para administradores)

El router base '/api/carrito' implementará tres rutas disponibles para usuarios y administradores:
## POST: '/' - Crea un carrito y devuelve su id.
## DELETE: '/:id' - Vacía un carrito y lo elimina.
## GET: '/:id/products' - Me permite listar todos los productos guardados en el carrito
## POST: '/:id/products' - Para incorporar productos al carrito por su id de producto
## DELETE: '/:id/products/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
Crear una variable booleana administrador, cuyo valor configuraremos más adelante con el sistema de login. Según su valor (true ó false) me permitirá alcanzar o no las rutas indicadas. En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. Ejemplo: { error : -1, descripcion: ruta 'x' método 'y' no autorizada }

Un producto dispondrá de los siguientes campos:  
id, timestamp , nombre, descripcion, código, foto, precio, stock.
El carrito de compras tendrá la siguiente estructura: 
id, timestamp(carrito), productos: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }
El timestamp puede implementarse con Date.now() (es en el back)
Realizar la persistencia de productos y del carrito de compras en el filesystem.

Para realizar la prueba de funcionalidad hay dos opciones:
Probar con postman cada uno de los endpoints (productos y carrito) y su operación en conjunto. (*descargar un archivo de postman o documentarlo bien!!!)

En todos los casos, el diálogo entre el frontend y el backend debe ser en formato JSON. El servidor no debe generar ninguna vista.
En el caso de requerir una ruta no implementada en el servidor, este debe contestar un objeto de error: ej { error : -2, descripcion: ruta 'x' método 'y' no implementada}
La estructura de programación será ECMAScript (6), separada tres en módulos básicos (router, lógica de negocio/api y persistencia ). Más adelante implementaremos el desarrollo en capas. Utilizar preferentemente** clases, constructores de variables let y const y arrow function.
Realizar la prueba de funcionalidad completa en el ámbito local (puerto 8080) y en glitch.com



