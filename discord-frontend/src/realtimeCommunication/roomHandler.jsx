import { setOpenRoom, setRoomDetails, setActiveRooms, setLocalStream, setRemoteStreams, setScreenSharingStream, setIsUserJoinedOnlyWithAudio } from '../store/actions/roomActions';
import store from '../store/store';
import * as socketConnection from "./socketConnection";
import * as webRTCHandler from './webRTCHandler';

export const createNewRoom = () =>{
    const successCalbackFunc = () => {
        store.dispatch(setOpenRoom(true, true));

        const chatId=store.getState().chat.chosenChatDetails.id;
        const chatType=store.getState().chat.chatType;

        const chatInfo={
            chatId:chatId,
            chatType:chatType
        }

        const audioOnly = store.getState().room.audioOnly;
        store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
        socketConnection.createNewRoom(chatInfo);
    };

    const audioOnly = store.getState().room.audioOnly;
    webRTCHandler.getLocalStreamPreview(audioOnly, successCalbackFunc);
}; 

export const newRoomCreated = (data) => {
    const {roomDetails} = data;
    store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
    const { activeRooms } = data;
    
    const friends = store.getState().friends.friends;
    const groups = store.getState().groups.groups;
    const rooms = [];

    const userId = store.getState().auth.userDetails?._id;
    const username = store.getState().auth.userDetails?.username;

    activeRooms.forEach((room) => {
        const isRoomCreatedByMe = room.roomCreator.userId === userId;

        if(room.chatType=='GROUP'){
            if (isRoomCreatedByMe) {
                rooms.push({ ...room, creatorUsername: 'Me' });
            } else {
                groups.forEach((g) => {
                    if (g.id === room.chatId) {
                        rooms.push({ ...room, creatorUsername: g.name });
                    }
                });
            }

        }else if(room.chatType=='DIRECT'){
            console.log('direct');
            if (isRoomCreatedByMe) {
                rooms.push({ ...room, creatorUsername: 'Me' });
            } else {
                    if (userId === room.chatId) {
                        friends.forEach((f) => {
                            if(f.id==room.roomCreator.userId){
                                rooms.push({ ...room, creatorUsername: f.username });
                            }
                            
                        })
                        
                    }
            }
        }else if(room.chatType=='SUBGROUP'){
            if (isRoomCreatedByMe) {
                rooms.push({ ...room, creatorUsername: 'Me' });
            } else {
                groups.forEach((g) => {
                    const subgroups=g.subgroups;
                    subgroups.forEach((s) => {
                        console.log(room.chatId);
                        if (s._id === room.chatId) {
                            const participants= s.participants;
                            participants.forEach((p) => {
                                if (p === userId) {
                                    rooms.push({ ...room, creatorUsername: s.name });
                                }
                            });
                        }
                    });
                });
            }

        }
    });
    //Test correction

    store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (roomId) => {
    const succesCalbackFunc = () => {
        store.dispatch(setRoomDetails({ roomId }));
        store.dispatch(setOpenRoom(false, true));
        const audioOnly = store.getState().room.audioOnly;
        store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
        socketConnection.joinRoom({ roomId });
    };

    const audioOnly = store.getState().room.audioOnly;
    webRTCHandler.getLocalStreamPreview(audioOnly, succesCalbackFunc);
};

export const leaveRoom = () => {
    const roomId = store.getState().room.roomDetails.roomId;

    const localStream = store.getState().room.localStream;
    if(localStream) {
        localStream.getTracks().forEach(track => track.stop());
        store.dispatch(setLocalStream(null));
    }

    const screenSharingStream = store.getState().room.screenSharingStream;
    if(screenSharingStream){
        screenSharingStream.getTracks().forEach((track) => track.stop());
        store.dispatch(setScreenSharingStream(null));
    }

    store.dispatch(setRemoteStreams([]));
    webRTCHandler.closeAllConnections();

    socketConnection.leaveRoom({ roomId });
    store.dispatch(setRoomDetails(null));
    store.dispatch(setOpenRoom(false, false));
};