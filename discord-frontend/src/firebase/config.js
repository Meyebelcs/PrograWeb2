import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyB1O4Pq75fr5MmFVD0wRY7FPseODnblGFE",
  authDomain: "web-2-48c87.firebaseapp.com",
  projectId: "web-2-48c87",
  storageBucket: "web-2-48c87.appspot.com",
  messagingSenderId: "719473985605",
  appId: "1:719473985605:web:add2de5e5011a514587b2c"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file){
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef,file);
  const url= await getDownloadURL(storageRef,file);
  return url;
}