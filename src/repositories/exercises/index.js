/* archivo indice para exportar queries de exercices */
const insertExercise = require("./insertExercise");
const selectExerciseByName = require("./selectExerciseByName");
const selectExercises = require("./selectExercises");
const selectExerciseById = require("./selectExerciseById");
const deleteExerciseById = require("./deleteExerciseById")

module.exports = {
    insertExercise,
    selectExerciseByName,
    selectExercises,
    selectExerciseById,
    deleteExerciseById
};