const authSocket = require('./middleware/authSocket');
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const disconnectHandler = require('./socketHandlers/disconnectHandler');
const directMessageHandler = require("./socketHandlers/directMessageHandler");
const directChatHistoryHandler = require('./socketHandlers/directChatHistoryHandler');
const groupMessageHandler = require("./socketHandlers/groupMessageHandlers");
const roomCreateHandler = require('./socketHandlers/roomCreateHandler');
const groupChatHistoryHandler = require('./socketHandlers/groupChatHistoryHandler');


const serverStore = require('./serverStore');

const registerSocketServer = (server) => {
    const io = require('socket.io')(server, {
        cors: { //Aceptamos peticiones de todos lados por medio de GET y POST
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    serverStore.setSocketServerInstance(io);

    //Usamos el middleware para validar que el token sea válido
    io.use((socket, next) => {
        authSocket(socket, next);
    });

    const emitOnlineUsers = () => {
        const onlineUsers = serverStore.getOnlineUsers();
        io.emit('online-users', { onlineUsers });
    };

    io.on('connection', (socket) => {
        console.log('user connected');
        console.log(socket.id);

        newConnectionHandler(socket, io);
        emitOnlineUsers();

        socket.on('direct-message', (data) => {
            directMessageHandler(socket, data);
        });

        socket.on('group-message', (data) => {
            console.log('Group message');
            groupMessageHandler(socket, data);
        });

        socket.on('direct-chat-history', (data) => {
            directChatHistoryHandler(socket, data);
        });

        socket.on('group-chat-history', (data) => {
            groupChatHistoryHandler(socket, data);
        });

        socket.on('room-create', () =>{
            roomCreateHandler(socket);
        });

        socket.on('disconnect', () => {
            disconnectHandler(socket);
        });
    });

    setInterval(() => {
        emitOnlineUsers();
    }, [8000]);
};

module.exports = {
    registerSocketServer,
};