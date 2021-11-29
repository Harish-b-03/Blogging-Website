import { auth, onAuthStateChanged, db, collection, getDocs, signInWithEmailAndPassword} from "./firebase.js";
// import "https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth.js"
import { addArticle } from "./blog.js";

let form = document.querySelector(".form");
// const LogIn = function(){
//     console.log("Inside LOGIN fnc")
//     const logInBtn =  document.querySelector(".LoginBtn");
//     if(logInBtn){
//         logInBtn.addEventListener('click',()=>{
//             let email = document.getElementById('emailInput');
//             let password = document.getElementById('passwordInput');
//             if(email == ""){
//                 alert("Please Enter E-mail")
//                 console.log("Email enter")
//             }
//             if(password == ""){
//                 alert("Please Enter Password")
//             }
//         })
//     }
// }
// LogIn();
auth.onAuthStateChanged((user) => {
    if(user){
        // console.log("Logged In");
        login.style.display = "none";
        // console.log(user);
        // console.log(User_Name + " -- " + User_Email + " -- " + User_UID)
    }else{
        // console.log("NOT Logged In");
        form.innerHTML = ` 
        <div class="LoginPage">
            <div class="Intro">Login to your account</div>
            <div class="Intro-2">Don't have an account?<div class="SignUp">Sign Up</div></div>
            <div>
                <span>Email: </span>
                <input type="email" id="emailInput" placeholder="email">
            </div>
            <div>
                <span>Password: </span>
                <input type="password" id="passwordInput" placeholder="password">
            </div>
            <div class="LoginBtn" onclick="LogIn();">
                Login
            </div>
        </div>`
        
        let signUp = document.querySelector(".SignUp");
        
        signUp.addEventListener('click',()=>{
            // IMPORTANT
            // form.innerHTML = ` 
            // <div class="LoginPage">
            //     <div class="Intro">Sign up</div>
            //     <div class="Intro-2">Already have an account?<a href="/admin">Log in</div></div>
            //     <div class="GoogleLogin">
            //         <div id="loginUI"></div>
            //     </div>
            // </div>`
            // form.style.height = "fit-content";
            // setupLoginButton();
            form.innerHTML = ` 
            <div class="LoginPage">
            <div class="Intro">Sign up</div>
                <div class="Intro-2">Already have an account?<a href="/admin">Log in</a></div></div>
                <div>
                    <span>Email: </span>
                    <input type="email" id="emailInput" placeholder="email">
                </div>
                <div>
                    <span>Password: </span>
                    <input type="password" id="passwordInput" placeholder="password">
                </div>
                <div>
                    <span>Confirm Password: </span>
                    <input type="password" id="confirmPasswordInput" placeholder="password">
                </div>
                <div class="LoginBtn" onclick="SignUp();">
                    Signup
                </div>
            </div>`
        })  
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