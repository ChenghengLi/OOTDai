
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions, httpsCallable } from "firebase/functions";



const firebaseConfig = {
 
  apiKey: "AIzaSyDjKmGZhQCqOBVIlIrNNaD3mV6yspkRPk0",
  authDomain: "myoxytocin000-e3049.firebaseapp.com",
  databaseURL: "https://myoxytocin000-e3049-default-rtdb.firebaseio.com",
  projectId: "myoxytocin000-e3049",
  storageBucket: "myoxytocin000-e3049.appspot.com",
  messagingSenderId: "89741447073",
  appId: "1:89741447073:web:c0b24acbf5f8e0692245e0",
  measurementId: "G-9CFZTL0FYW"
 
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

export { auth, db, storage, functions, httpsCallable };
