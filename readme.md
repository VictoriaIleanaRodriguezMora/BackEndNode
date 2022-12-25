> https://www.loom.com/share/9a05f6e2f02e473eafa597465cdeca6f
# ¿ Como probar los Endpoints ?

## En los Routers, te vas a encontrar algo así: Todo está comentado. Para probar una de las formas, tenes que comentar los comentarios de bloque. Entonces cuando comentas esa linea se activa ese pedazo de código.

## Tip: Podes posicionarte sobre todas las partes de una misma base de datos que queres probar, comentas y descomentas todo a la vez.

```js
// GET /api/carrito/ - Return all the products
apiCart.get("/", async (req, res) => {
    // /*
    // FileSystem
    const syncProducts = await carritos.getAll();
    res.json(syncProducts);
    // FileSystem
    // */

    /*  
    // Mongo
    const cartMongo = await carritosMongo.getAll()
    console.log(cartMongo);
    res.json(cartMongo)
    // Mongo
    */

     /*
    // Firebase
    const GETprodsFirebase = await carritosFirebase.getAll()
    res.json(GETprodsFirebase)
    // Firebase
    */

  console.log("GET - Route: /api/carrito/");
});
```

### Basándose en los contenedores ya desarrollados (memoria, archivos) desarrollar dos contenedores más (que cumplan con la misma interfaz) que permitan realizar las operaciones básicas de CRUD en MongoDb (ya sea local o remoto) y en Firebase. Luego, para cada contenedor, crear dos clases derivadas, una para trabajar con Productos, y otra para trabajar con Carritos.

### A las clases derivadas de los contenedores se las conoce como DAOs (Data Access Objects), y pueden ir todas incluidas en una misma carpeta de ‘daos’.

### En la carpeta de daos, incluir un archivo que importe todas las clases y exporte una instancia de dao de productos y una de dao de carritos, según corresponda. Esta decisión se tomará en base al valor de una variable de entorno cargada al momento de ejecutar el servidor (opcional: investigar el uso de imports dinámicos).

### Incluir un archivo de configuración (config) que contenga los datos correspondientes para conectarse a las bases de datos o medio de persistencia que corresponda.

> Opcional:

### Hacer lo mismo para bases de datos relacionales: MariaDB/SQLite3.

