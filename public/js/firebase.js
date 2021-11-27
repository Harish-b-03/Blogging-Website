// import "https://www.gstatic.com/firebasejs/9.5.0/firebase-app-compat.js"
    {/*<script type="text/javascript" src="https://www.gstatic.com/firebasejs/9.1.3/firebase-auth-compat.js"></script>  */}
import { initializeApp }  from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js';
import { getFirestore, collection, getDocs, addDoc } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';
// import * as firebaseui from "https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth.js"
// import "https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth.js"
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
const auth = getAuth(app);
// const ui = new firebaseui.auth.AuthUI(auth);
// console.log(auth.signOut())
// console.log(auth.currentUser)

export { app, db, addDoc, collection, getDocs, auth, onAuthStateChanged, signOut, getAuth}