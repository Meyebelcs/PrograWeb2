import io from 'socket.io-client';
import { setPendingFriendsInvitations, setFriends, setOnlineUsers } from '../store/actions/friendsActions';
import {setGroups } from '../store/actions/groupsActions';
import store from '../store/store';
import { updateDirectChatHistoryIfActive, updateGroupChatHistoryIfActive } from '../shared/utils/chat';

let socket = null;

export const connectWithSocketServer = (userDetails) => {

    const jwtToken = userDetails.token;

    socket = io('http://localhost:5002', { //le pasamos la dirección de nuestro servidor
        auth: {//Pasamos el token del usuario
            token: jwtToken,
        }
    });

    socket.on('connect', () => {
        console.log('Conectado exitosamente a socket.io server');
        console.log(socket.id);
    });

    socket.on('friends-invitations', (data) => {
        const { pendingInvitations } = data;
        store.dispatch(setPendingFriendsInvitations(pendingInvitations));
    })

    socket.on('friends-list', (data) => {
        const { friends } = data;
        store.dispatch(setFriends(friends));
    })

    socket.on('online-users', (data) => {
        const { onlineUsers } = data;
        store.dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on('direct-chat-history', (data) => {
        updateDirectChatHistoryIfActive(data);
    });

    socket.on('groups-list', (data) => {
        const { groups } = data;
        store.dispatch(setGroups(groups));
    });

    socket.on('group-chat-history', (data) => {
        updateGroupChatHistoryIfActive(data);
    });

};

export const sendDirectMessage = (data) => {
    socket.emit("direct-message", data);
};

export const sendGroupMessage = (data) => {
    socket.emit("group-message", data);
};

export const getDirectChatHistory = (data) => {
    socket.emit("direct-chat-history", data);
};

export const getGroupChatHistory = (data) => {
    socket.emit("group-chat-history", data);
};
