/* funcion SQL query: seleccionar exercise sabiendo su nombre */

const getPool = require("../../database/getPool");

async function selectExerciseByName(name) {
  // solicitar conexion a bbdd
  const pool = getPool();

  const [[exercise]] = await pool.query("SELECT * FROM exercises WHERE name = ?", [
    name,
  ]);

  // devolver objeto user con: idUser, email, password (encriptada), role
  return exercise;
};

module.exports = selectExerciseByName;