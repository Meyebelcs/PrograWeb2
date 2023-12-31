import io from 'socket.io-client';
import { setPendingFriendsInvitations, setFriends, setOnlineUsers } from '../store/actions/friendsActions';
import {setGroups } from '../store/actions/groupsActions';
import store from '../store/store';
import { updateDirectChatHistoryIfActive, updateGroupChatHistoryIfActive } from '../shared/utils/chat';
import * as roomHandler from './roomHandler';
import * as webRTCHandler from './webRTCHandler';
import Swal from 'sweetalert2';

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

    socket.on('room-create', (data) => {
        roomHandler.newRoomCreated(data);
    });

    socket.on('group-chat-history', (data) => {
        updateGroupChatHistoryIfActive(data);
    });

    socket.on('active-rooms', (data) => {
        roomHandler.updateActiveRooms(data);
    });

    socket.on('conn-prepare', (data) => {
        const { connUserSocketId } = data;
        webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);
        socket.emit("conn-init", { connUserSocketId: connUserSocketId });
    });

    socket.on("conn-init", (data) => {
        const { connUserSocketId } = data;
        webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
    });

    socket.on("conn-signal", (data) => {
        webRTCHandler.handleSignalingData(data);
    });

    socket.on("room-participant-left", (data) => {
        console.log("user left room");
        webRTCHandler.handleParticipantLeftRoom(data);
    });

    socket.on("error-message", (data) => {
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: data
          });
    });
};

export const sendDirectMessage = (data) => {
    socket.emit("direct-message", data);
};

export const sendGroupMessage = (data) => {
    socket.emit("group-message", data);
};

export const sendSubgroupMessage = (data) => {
    socket.emit("subgroup-message", data);
};

export const getDirectChatHistory = (data) => {
    socket.emit("direct-chat-history", data);
};

export const getGroupChatHistory = (data) => {
    socket.emit("group-chat-history", data);
};

export const getSubgroupChatHistory = (data) => {
    socket.emit("subgroup-chat-history", data);
};

export const createNewRoom = (data) => {
    console.log(data);
    socket.emit("room-create",data);
}

export const joinRoom = (data) => {
    socket.emit("room-join", data);
};

export const leaveRoom = (data) => {
    socket.emit("room-leave", data);
};

export const signalPeerData = (data) => {
    socket.emit("conn-signal", data);
};