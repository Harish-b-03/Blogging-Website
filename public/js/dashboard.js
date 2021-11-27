import { auth, onAuthStateChanged, db, collection, getDocs} from "./firebase.js";
import "https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth.js"
import { addArticle } from "./blog.js";
auth.onAuthStateChanged((user) => {
    if(user){
        // console.log("Logged In");
        login.style.display = "none";
        // console.log(user);
        // console.log(User_Name + " -- " + User_Email + " -- " + User_UID)
    }else{
        // console.log("NOT Logged In");
        setupLoginButton();
    }
})

// Project-public-facing-name given by firebase during GoogleSignIn Enabling is "project-666347440620"

// LOGIN PAGE

let ui = new firebaseui.auth.AuthUI(auth);
let login = document.querySelector('.login');

const setupLoginButton = () => {
    ui.start('#loginUI',{
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectURL){
                login.style.display = "none";
                location.replace("/")
                return false;
            }
        },
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ]
    });
}


// Setting up Blog Cards FOR DASHBOARD -> blogs created By that particular user

// in BLOGS.JS