import { setOpenRoom, setRoomDetails, setActiveRooms, setLocalStream, setRemoteStreams, setScreenSharingStream, setIsUserJoinedOnlyWithAudio } from '../store/actions/roomActions';
import store from '../store/store';
import * as socketConnection from "./socketConnection";
import * as webRTCHandler from './webRTCHandler';

export const createNewRoom = () =>{
    const successCalbackFunc = () => {
        store.dispatch(setOpenRoom(true, true));

        const audioOnly = store.getState().room.audioOnly;
        store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
        socketConnection.createNewRoom();
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
    console.log("rooms update came from the server");
    console.log(activeRooms);
    
    const friends = store.getState().friends.friends;
    const rooms = [];

    activeRooms.forEach((room) => {
        friends.forEach((f) => {
            if(f.id === room.roomCreator.userId) {
                rooms.push({...room, creatorUsername: f.username});
            }
        });
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