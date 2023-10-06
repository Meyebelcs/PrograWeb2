import io from 'socket.io-client';
import { setPendingFriendsInvitations} from '../store/actions/friendsActions';
import store from '../store/store';
let socket=null;

export const connectWithSocketServer=(userDetails)=>{
    
    const jwtToken=userDetails.token;
    
    socket=io('http://localhost:5002',{
        auth:{
            token:jwtToken,
        }
    });

    console.log(socket);

    socket.on('connect',()=>{
        console.log('succesfully connected with socket.io server');
        console.log(socket.id);
    });

    socket.on('friends-invitations',(data)=>{
        const {pendingInvitations}=data;
        console.log('friends invitaitons event came');
        console.log(pendingInvitations);

        store.dispatch(setPendingFriendsInvitations(pendingInvitations));
    })

}