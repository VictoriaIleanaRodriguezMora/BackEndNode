### En el archivo package.json, está el comando **npm run createTables**. Es el que hay que ejecutar para que cree las tablas, debajo, está el comando INSERT. Para agregar algo a cada BD.

### El proyecto está corriendo en el puerto 8000 ruta "/"

|       Command        | 
| :------------------: | 
| npm run createTables | 

> Instructions: Develop a new Class with the same methods as the previous challenge, but that works with databases.

> Using **KNEX** for the connection. This Class should receive in the constructor, the config object to the KNEX connection AND the name of the table with which it will work.

> Modife the previous challengue from Class 11 "Chat with Websockets", and:

| To change | DB             |
| :-------: | -------------- |
| Messages  | SQLite3        |
| Products  | MariaDB/MysSql |

> Code a .js which create the tables.

> Define a folder DB to store the SQLite3 Data Base called "ecommerce"

### createTableProds() This method is so decoupled, but it only works to create a table of products, by the fields of the form.

### NOTE IMPORTANT. The methods of CHAT and PRODUCTS can't be shared
