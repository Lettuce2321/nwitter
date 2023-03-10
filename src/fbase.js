import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore, addDoc, getDocs, collection, query, onSnapshot } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyANoRFBdNtC5CKwA5zhebUwj-nMyl94At0",
    authDomain: "nwitter-fd0bc.firebaseapp.com",
    projectId: "nwitter-fd0bc",
    storageBucket: "nwitter-fd0bc.appspot.com",
    messagingSenderId: "124146155673",
    appId: "1:124146155673:web:2708b86ee1d2f722133808"
};

const app = initializeApp(firebaseConfig);
export const authService = getAuth();
export const dbService = getFirestore();
export const dbAddDoc = addDoc;
export const dbCollection = collection;
export const dbQuery = query;
export const dbOnSnapShot = onSnapshot;
