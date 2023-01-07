/* archivo indice para exportar controllers de exercises */
const postNewExercise = require("./postNewExercise");
const getExercises = require("./getExercises");
const getExerciseDetails = require("./getExerciseDetails");
const deleteExercise = require("./deleteExercise")

module.exports = {
  postNewExercise,
  getExercises,
  getExerciseDetails,
  deleteExercise
};
