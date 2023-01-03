/* ARCHIVO PRINCIPAL DEL SERVIDOR */
/* CARGAR MODULOS */
require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const fileUpload = require("express-fileupload");
app.use(fileUpload());

/* CARGAR CONTROLLERS */
// de users
const {
  loginUser
} = require("./controllers/users")

// de exercices
const {
  postNewExercise
} = require("./controllers/exercises");

/* CARGAR MIDDLEWARES (desde su index.js) */
const {
  errorNotFound,
  errorHandler,
  checkAdmin
} = require("./middlewares")

/* RECOGER VARIABLES PRIVADAS del .env */
const {PORT} = process.env;

/* ABRIR SERVIDOR */
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });

/* ENDPOINTS users - not logged */

app.get("/login", loginUser);

//app.get("/register", registerUser);

/* ENDPOINTS exercises - worker */

// app.get("/exercises", validateAuth, getExercises);

//app.get("/exercices:idExercise", validateAuth, getExerciseDetails);
// incluir si podemos opcion de filtrado

//app.post("/exercices:idExercise/like", validateAuth, toggleExerciseLike);

//app.post("/exercices:idExercise/fav", validateAuth, toggleExerciseFav);

//app.get("/favorites:idUser", validateAuth, getUserFavs);


/* ENDPOINTS exercises admin */

//app.post("/newExercise", validateAuth, checkAdmin, postNewExercise);
app.post("/newExercise", postNewExercise); // para testear pendiente de juntar validateAuthy y checkAdmin

//app.put("/exercises/idExercise", validateAuth, checkAdmin, putEditExercise);

/* MIDDLEWARES ERRORES */

// error 404
app.use(errorNotFound);

// errores generico
app.use(errorHandler);