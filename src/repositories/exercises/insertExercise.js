/* funcion SQL query: insertar ejercicio en la bbdd */

const getPool = require("../../database/getPool");

async function insertExercise(exercise) {
    // recoger datos del objeto exercise
    const {name, description, typology, muscles} = exercise;

    // conectar con bbdd
    const pool = getPool();

    // SQL
    await pool.query(`
        INSERT INTO exercises (name, description, typology, muscles) VALUES (?, ?, ?, ?)`, [name, description, typology, muscles]
    );

}


module.exports = insertExercise;