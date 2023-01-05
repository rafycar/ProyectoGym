/* funcion: crear nuevo ejercicio 
se espera: peticion con un body form-data q contenga:
  -key=value
    --name=
    --description=
    --typology=
    --muscle=
    --picture=
se envia: confirmacion
*/
const { createError, processImage } = require("../../utilities");
const { exerciseSchema } = require("../../validationSchemas");
const {
  selectExerciseByName,
  insertExercise,
} = require("../../repositories/exercises");

async function postNewExercise(req, res, next) {
  try {
    // validar body de la peticion del cliente
    await exerciseSchema.validateAsync(req.body);

    // recoger datos del body
    const { name, description, typology, muscles } = req.body;

    // recoger ruta de la imagen PENDIENTE

    // comprobar si el ejercicio ya existe: si en la bbdd ya hay ese nombre
    // // seleccionar exercise de la bbdd
    const exercise = await selectExerciseByName(name);

    if (exercise) {
      createError("An exercise with that name already exists.", 409);
    }

    // gestionar imagen subida por cliente
    // // recuperar datos de la peticion;
    const picture = req.files.picture;

    //if (picture) {
      // validar q se envia 1 unica imagen;; ileupload devuleve objeto si 1 unica imageh y array si mas de una imagen
      //if (typeof exerciseImage !== 'object')

      // procesar imagen (ajustar y guardar), enviando su buffer con .data;
      // // processImage(buffer, folder, size)
      const pictureName = await processImage(picture.data, "exercise", 1000);
    //}
    // insertar exercise en la bbdd (llamar repositorio)
    await insertExercise({ name, description, typology, muscles, pictureName });

    // enviar respuesta
    res.status(201).send({
      status: "ok - exercise created successfully",
      data: {
        name,
        description,
        typology,
        muscles,
        pictureName,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = postNewExercise;
