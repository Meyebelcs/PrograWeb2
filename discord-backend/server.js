const express=require('express');
const http = require('http');
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();

const SocketServer=require('./socketServer');
const authRoutes=require("./routes/authRoutes");
const friendInvitationRoutes=require("./routes/friendInvitationRoutes");
const groupRoutes=require("./routes/groupRoutes");

const PORT =process.env.PORT || process.env.API_PORT;

const app=express();
app.use(express.json());
app.use(cors());

//Registro de las rutas
app.use('/api/auth', authRoutes);
app.use('/api/friend-invitation',friendInvitationRoutes);
app.use('/api/group',groupRoutes);

const server = http.createServer(app);
SocketServer.registerSocketServer(server);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    server.listen(PORT, ()=>{
        console.log(`El servidor está escuchando en el puerto ${PORT}`);
    });
})
.catch((err)=>{
    console.log("La conexión a la base de datos falló. El servidor no ha sido iniciado");
    console.error(err);
});