const {
  selectFavByExerciseAndUser,
  insertFav,
  deleteFav,
  newFav,
} = require("../../repositories/favs");
const { selectExerciseById } = require("../../repositories/exercises");
const { idExerciseSchema } = require("../../validationSchemas");
const { createError } = require("../../utilities");

const toggleExerciseFav = async (req, res, next) => {
  try {
    // validar parametro recibido
    await idExerciseSchema.validateAsync(req.params);

    // recoger parametro (path param - :idExercise) (req.params devuelve objeto- desestrucutrar para obtener solo numero)
    const { idExercise } = req.params;

    // recuperar exercise de la bbdd con su idExercise
    const exercise = await selectExerciseById(idExercise);

    // lanzar error si no existe el idExercise solicitado
    if (typeof exercise === "undefined") {
      createError("There is no exercise with that idExercise", 404);
    }

    // recoger idUser de la autenticacion
    const { idUser } = req.auth;

    // seleccionar fav de la bbdd
    const fav = await selectFavByExerciseAndUser(idExercise, idUser);

    let statusCode;
    //si es la primera vez q el usuario le da crearlo
    if (fav === undefined) {
      await newFav(idExercise, idUser);
      statusCode = 201;
      // reseleccionar fav de la bbdd
    const updatedFav = await selectFavByExerciseAndUser(idExercise, idUser);
      res.status(statusCode).send({ status: "ok", updatedfav });
    }

    // si tiene estado true se quita
    if (fav.stateFav === 1) {
      await deleteFav(idExercise, idUser);
      statusCode = 200;
    } //si no se pone
    else {
      await insertFav(idExercise, idUser);
      statusCode = 201;
    }

    // reseleccionar fav de la bbdd
    const updatedfav = await selectFavByExerciseAndUser(idExercise, idUser);

    res.status(statusCode).send({ status: "ok", updatedfav });
  } catch (error) {
    next(error);
  }
};

module.exports = toggleExerciseFav;
