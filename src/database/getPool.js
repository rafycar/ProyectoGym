// cargar modulos
const mysql = require("mysql2/promise");

// recoger datos de .env
const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_NAME,
  } = process.env;


// funcion: obtener conexion con la bd
let pool;

async function getDB() {
  // si aun no existe crear conexion
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      timezone: 'Z',
    });
  }
  return await pool.getConnection();
}

module.exports = getDB;