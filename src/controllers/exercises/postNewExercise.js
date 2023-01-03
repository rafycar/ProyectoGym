/* funcion: crear nuevo ejercicio 
se espera: peticion con un body form-data q contenga:
  -body
    --name
    --description
    --typology
    --muscle
  -files
    --picture
se envia: confirmacion
*/
const { createError } = require("../../utilities");
const { exerciseSchema } = require("../../validationSchemas");
const { selectExerciseByName, insertExercise } = require("../../repositories/exercises");

async function postNewExercise(req, res, next) {
  try {
    // validar body de la peticion del cliente
    await exerciseSchema.validateAsync(req.body);

    // recoger datos del body
    const { name, description, typology, muscle } = req.body;

    // recoger ruta de la imagen PENDIENTE

    // comprobar si el ejercicio ya existe: si en la bbdd ya hay ese nombre
    // // seleccionar exercise de la bbdd
    const exercise = await selectExerciseByName(name);

    if (exercise) {
      createError("An exercise with that name already exists.", 400);
    }

    // insertar exercise en la bbdd (llamar repositorio)
    await insertExercise({ name, description, typology, muscle });

    // enviar respuesta
    res.status(201).send({
      status: "ok - exercise created successfully",
      data: {
        name,
        description,
        typology,
        muscle,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = postNewExercise;
