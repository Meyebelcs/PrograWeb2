const authSocket = require('./middleware/authSocket');
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const disconnectHandler = require('./socketHandlers/disconnectHandler');
const directMessageHandler = require("./socketHandlers/directMessageHandler");
const directChatHistoryHandler = require('./socketHandlers/directChatHistoryHandler');
const groupMessageHandler = require("./socketHandlers/groupMessageHandlers");
const subgroupMessageHandler = require("./socketHandlers/subgroupMessageHandlers");
const roomCreateHandler = require('./socketHandlers/roomCreateHandler');
const roomJoinHandler = require('./socketHandlers/roomJoinHandler');
const groupChatHistoryHandler = require('./socketHandlers/groupChatHistoryHandler');
const subgroupChatHistoryHandler = require('./socketHandlers/subgroupChatHistoryHandler');
const roomLeaveHandler = require('./socketHandlers/roomLeaveHandler');
const roomInitializeConnectionHandler = require('./socketHandlers/roomInitializeConnectionHandler');
const roomSignalingDataHandler = require('./socketHandlers/roomSignalingDataHandler');
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

        socket.on('subgroup-message', (data) => {
            console.log('Subgroup message');
            console.log(data);
            subgroupMessageHandler(socket, data);
        });

        socket.on('direct-chat-history', (data) => {
            directChatHistoryHandler(socket, data);
        });

        socket.on('group-chat-history', (data) => {
            groupChatHistoryHandler(socket, data);
        });

        socket.on('subgroup-chat-history', (data) => {
            subgroupChatHistoryHandler(socket, data);
        });

        socket.on('room-create', (data) =>{
            roomCreateHandler(socket,data);
        });

        socket.on('room-join', (data) => {
            roomJoinHandler(socket, data);
        });

        socket.on('room-leave', (data) => {
            roomLeaveHandler(socket, data);
        });

        socket.on('conn-init', (data) => {
            roomInitializeConnectionHandler(socket, data);
        });

        socket.on('conn-signal', (data) => {
            roomSignalingDataHandler(socket, data);
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