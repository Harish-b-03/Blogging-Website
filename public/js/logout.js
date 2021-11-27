import { auth, onAuthStateChanged} from "./firebase.js";
auth.onAuthStateChanged((user)=>{
    if(user){
        console.log("In Logout.js " + user);
        auth.signOut();
    }
    location.replace("/")
})