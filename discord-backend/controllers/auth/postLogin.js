const User= require("../../models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const postLogin=async (req,res)=>{
    try{

        const{mail,password}=req.body;

        //Buscamos un usuario que concuerde con el correo eletrónico 
        const user=await User.findOne({mail: mail.toLowerCase()});

        //Comparamos si las contraseñas coinciden
        if(user&&(await bcrypt.compare(password,user.password))){
            

            return res.status(200).json({
                userDetails:{
                    mail:user.mail,
                    username:user.username,
                    _id: user._id,
                },
            });
        }

        return res.status(400).send('Credenciales invalidas.Por favor intente de nuevo');

    }catch(err){
        return res.status(500).send("Algo salió mal.Por favor intente de nuevo");
    }
};

module.exports=postLogin;