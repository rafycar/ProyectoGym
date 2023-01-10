CREATE DATABASE IF NOT EXISTS gym_app;

USE gym_app;

CREATE TABLE users (
	idUser INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL,
    role ENUM("admin", "worker") DEFAULT "worker"
);

CREATE TABLE exercises (
	idExercise INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(500) NOT NULL,
    typology VARCHAR(200),
    muscles VARCHAR(200),
    picture VARCHAR(500)
);

CREATE TABLE likes (
	idUser INT NOT NULL,
    FOREIGN KEY (idUser) REFERENCES users (idUser) ON DELETE CASCADE,
    idExercise INT NOT NULL,
    FOREIGN KEY (idExercise) REFERENCES exercises (idExercise) ON DELETE CASCADE,
    stateLike BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE favs (
	idUser INT NOT NULL,
    FOREIGN KEY (idUser) REFERENCES users (idUser) ON DELETE CASCADE,
    idExercise INT NOT NULL,
    FOREIGN KEY (idExercise) REFERENCES exercises (idExercise) ON DELETE CASCADE,
    stateFav BOOLEAN NOT NULL DEFAULT FALSE
);