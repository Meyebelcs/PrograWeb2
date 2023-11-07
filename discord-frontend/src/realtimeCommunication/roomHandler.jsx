import { setOpenRoom } from '../store/actions/roomActions';
import store from '../store/store';
import * as socketConnection from "./socketConnection";

export const createNewRoom = () =>{
    store.dispatch(setOpenRoom(true, true));
    socketConnection.createNewRoom();
}; 