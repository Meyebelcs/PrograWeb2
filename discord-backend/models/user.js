const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Definimos el modelo user que será guardado en la base de datos
const userSchema = new mongoose.Schema({
    mail: { type: String, unique: true },//Usamos unique para que cada correo sea único
    username: { type: String},
    password: { type: String},
});

module.exports = mongoose.model("User", userSchema);