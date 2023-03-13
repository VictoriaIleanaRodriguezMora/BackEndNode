# COMO ARRANCAR EL PROYECTO

|      -       |      -       |
| :----------: | :----------: |
| npm run prod | npm run test |

RUTAS QUE DEVUELVEN UN JSON
GET: http://localhost:5050/auth/profileuser
GET: http://localhost:5050/faker
POST: http://localhost:5050/carritos
GET: http://localhost:5050/api/products

Todas estas rutas estan testeadas por MOCHA.
Revisar en forma completa el proyecto entregable que venimos realizando, refactorizando y reformando todo lo necesario para llegar al esquema de servidor API RESTful (\*solo la parte de productos tal cual dice en la otra diapositiva, o sea, pasar los res.render() a res.json() PERO NO BORRAR LOS RENDER SOLO COMENTAR PORQUE MAS ADELANTE VA A VOLVER!) en capas planteado en esta clase.
Asegurarse de dejar al servidor bien estructurado con su ruteo / controlador, servicio, negocio, validaciones (sobre todo el post y el put), persistencia y configuraciones (preferentemente utilizando en la codificación clases de ECMAScript).
No hace falta realizar un front ya que utilizaremos tests para verificar el correcto funcionamiento de las funcionalidades desarrolladas.

Desarrollar un cliente de pruebas propio que utilice Axios para enviar peticiones, y realizar un test de la funcionalidad hacia la API Rest de productos, verificando la correcta lectura de productos disponibles, creación de productos, modificación y borrado (opcional).
Luego, realizar las mismas pruebas, a través de un código de test apropiado, que utilice mocha, chai y Supertest, para probar cada uno de los métodos HTTP de la API Rest de productos (si o si).
