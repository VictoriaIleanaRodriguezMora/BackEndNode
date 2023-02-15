// Products - MySQL
const optionsMySQL = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "test",
  },
};
// Products - MySQL

// Messages - SQLite3
const optionsSQLite3 = {
  client: "sqlite3",
  connection: {
    filename: "./sqlite/DataBaseMySQL.sqlite",
  },
  useNullAsDefault: true,
};
// Messages - SQLite3



module.exports = {
  optionsMySQL,
  optionsSQLite3,
};
