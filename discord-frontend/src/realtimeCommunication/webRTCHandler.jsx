import store from "../store/store";
import { setLocalStream, setRemoteStreams } from "../store/actions/roomActions";
import Peer from 'simple-peer';
import * as socketConnection from './socketConnection';

const getConfiguration = () => {
    const turnIceServers = null;

    if(turnIceServers){

    }else{
        console.warn('Using only STUN server');
        return {
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302',
                },
            ],
        };
    }
};

const onlyAudioConstraints = {
    audio: true,
    video: false
}

const defaultConstraints = {
    video: true,
    audio: true
}

export const getLocalStreamPreview = (onlyAudio=false, callbackFunc) => {
    const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;
    
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        store.dispatch(setLocalStream(stream));
        callbackFunc();
    }).catch(err => {
        console.log(err);
        console.log("Cannot get access to local stream");
    });
};

let peers = {};

export const prepareNewPeerConnection = (connUserSocketId, isIinitiator) => {
    const localStream = store.getState().room.localStream;

    if(isIinitiator){
        console.log('Preparing new peer connection as initiator');
    }else{
        console.log('Preparing new peer connection as not initiator');
    }

    peers[connUserSocketId] = new Peer({
        initiator: isIinitiator,
        config: getConfiguration(),
        stream: localStream
    });

    peers[connUserSocketId].on('signal', data => {
        const signalData = {
          signal: data,
          connUserSocketId: connUserSocketId,  
        };

        socketConnection.signalPeerData(signalData);
        //socketConnection.signalPeerData(signalData);
    });

    peers[connUserSocketId].on("stream", (remoteStream) => {
        console.log('remote stream came from other user');
        console.log('direct connection has been established');
        remoteStream.connUserSocketId = connUserSocketId;
        addNewRemoteStream(remoteStream);
    });
};

export const handleSignalingData = (data) => {
    const { connUserSocketId, signal } = data;

    if(peers[connUserSocketId]) {
        peers[connUserSocketId].signal(signal);
    }
};

const addNewRemoteStream = (remoteStream) => {
    const remoteStreams = store.getState().room.remoteStreams;
    const newRemoteStreams = [...remoteStreams, remoteStream];

    store.dispatch(setRemoteStreams(newRemoteStreams));
};