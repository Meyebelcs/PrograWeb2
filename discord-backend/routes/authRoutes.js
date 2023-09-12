const express=require('express');
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers");
const Joi=require('joi');
const validator=require('express-joi-validation').createValidator({});

const registerSchema=Joi.object({
    username:Joi.string().min(3).required().messages({
        "any.required": "El nombre de usuario es requerido",
        "string.min": "El nombre de usuario debe tener mínimo 3 caracteres",
      }),
    password: Joi.string().min(8).required().pattern(new RegExp('^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.*[a-zA-Z]).{8,}$')).messages({
        "any.required": "La contraseña es requerida",
        "string.min": "La contraseña debe tener mínimo 8 caracteres",
        "string.pattern.base": "La contraseña no tiene el formato correcto"
      }),
    mail:Joi.string().email().required().messages({
        "any.required": "La contraseña es requerida",
        "string.email": "El correo elctrónico no es válido",
      }),
});

const loginSchema = Joi.object({
    password: Joi.string().required().messages({
        "any.required": "La contraseña es requerida",
      }),
    mail: Joi.string().email().required().messages({
        "any.required": "El correo es requerido",
      }),
});

router.post('/register', validator.body(registerSchema),authControllers.controllers.postRegister);
router.post('/login', validator.body(loginSchema),authControllers.controllers.postLogin);

module.exports=router;