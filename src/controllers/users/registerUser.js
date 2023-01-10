const { userRegisterSchema } = require("../../validationSchemas");
const { selectUserByEmail } = require("../../repositories/users");
const { createError } = require("../../utilities");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res, next) {
    try {
        // validar body de la peticion del cliente
        await userRegisterSchema.validateAsync(req.body);
    
        // recoger datos del body
        const { email, password, rol } = req.body;
        
        // comprobar si el usuario existe: si en la bbdd ya hay ese email
        // seleccionar usuario de la bbdd (user contiene id, email, password (encriptada) y role)
        const user = await selectUserByEmail(email);
        console.log(user);
    
        // superadas las comprobaciones asignar token de sesion
        // // datos del token: id del usuario en bbdd
        const tokenPayload = { idUser: user.idUser };
    
        // generar token
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
    
        // enviar respuesta
        res.status(400).send({
          status: "ok - register in succesfully",
          data: { userToken: token },
        });
      } catch (error) {
        next(error);
      }
}

module.exports = registerUser;
