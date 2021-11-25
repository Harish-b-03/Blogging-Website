import { initializeApp }  from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js';
import { getFirestore, collection, getDocs, addDoc } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyDk-C0c-L12JY7RaWTF1fBHa-2BAGS7F80",
    authDomain: "blogging-website-791a0.firebaseapp.com",
    projectId: "blogging-website-791a0",
    storageBucket: "blogging-website-791a0.appspot.com",
    messagingSenderId: "666347440620",
    appId: "1:666347440620:web:de3bdd685d611e6cca58c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
//import { getAuth } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
//const auth = getAuth(firebaseConfig);

export { app, db, addDoc, collection, getDocs }