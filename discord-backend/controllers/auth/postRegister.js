const User = require('../../models/user');
const History= require("../../models/history");
const bcrypt=require("bcryptjs");
const jwt =require('jsonwebtoken');

const postRegister = async (req,res)=>{
    try{
        const{username,password,mail}=req.body;

        //Revisamos si el usuario existe
        const userExists=await User.exists({mail: mail.toLowerCase()});

        if(userExists){
            return res.status(409).send("El correo electrónico ya está en uso");
        }

        //Encriptamos la contraseña
        const encryptedPassword = await bcrypt.hash(password,10);

        //Guardamos al usuario en la base de datos
        const user = await User.create({
            mail:mail.toLowerCase(),
            username,
            password:encryptedPassword
        });

        //create JWT Token
        const token= jwt.sign(
            {
                userId: user._id,
                mail
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: '24h'
            }
        );

        const history = await History.create({
            userId:user._id,
            action:'Register',
        });

        res.status(201).json({
            userDetails:{
                mail:user.mail,
                token: token,
                username:user.username,
                _id: user._id,
            },
        });


    }catch(err){
        return res.status(500).send('Ocurrió un error. Intente de nuevo');
    }
};

module.exports=postRegister;