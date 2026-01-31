import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
  signOut,

  onAuthStateChanged,

  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";


import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js"; // realtime db

import {
  getFirestore,
  doc,
  setDoc, serverTimestamp,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  onSnapshot,

  deleteDoc,
  where,
  or,
  and,

  addDoc 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyANr8End80cztEJdrK9Ux7unE3UrgHw1aY",
    authDomain: "femhack-02.firebaseapp.com",
    projectId: "femhack-02",
    storageBucket: "femhack-02.firebasestorage.app",
    messagingSenderId: "199629287042",
    appId: "1:199629287042:web:f7b1b9a163253a5aae0e9b",
    measurementId: "G-0PTB1B94HH"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app); // realtime db
const db = getFirestore(app);


export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,


  ref,
  set,
  database,

  db,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
  updateDoc,
  collection,
  getDocs,

  query,
  onSnapshot,

  deleteDoc,
  where,
   or,
   and,
   addDoc
}