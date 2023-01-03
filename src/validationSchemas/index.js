/* archivo indice para exportar esquemas de validacion */
// de users
const userLoginSchema = require("./users/userLoginSchema");

// de exercices
const exerciseSchema = require("./exercises/exerciseSchema");

module.exports = {
    userLoginSchema,
    exerciseSchema
};