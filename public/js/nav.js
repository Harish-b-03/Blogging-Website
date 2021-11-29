// import { auth, onAuthStateChanged, signOut} from '../js/firebase.js'
// let ul = document.querySelector('.link-container');
// let navbar = document.querySelector('.navbar');
// let profile = document.querySelector('.Profile');
// let profileDropDown = document.querySelector('.ProfileDropDown');
// let nav  = document.querySelector('.Nav');
// // let logoutBtn = document.getElementById('LogOutBtn');
// let page = decodeURI(location.pathname.split("/").pop()); 

// // console.log(page);
// window.onload = () => {
//     auth.onAuthStateChanged((user) => {
//     if(user){
//         let photo = user.photoURL;
//         let User_Name = user.displayName;
//         let User_Email = user.email;
//         // console.log(user.photoURL);
//         console.log(auth.currentUser.photoURL)
//         if(page == "admin"){
//             ul.innerHTML += `<li class="link-item"><a href="/admin" class="link active">Dashboard</a></li>`
//             // console.log(user);
//         }
//         else{
//             ul.innerHTML += `<li class="link-item"><a href="/admin" class="link">Dashboard</a></li>`
//         }
//         ul.innerHTML += `
//             <li class="link-item"><a href="/logout" class="link">Logout</a></li>
//            `
//         navbar.innerHTML += `<li class="Profile"><img src=${photo} alt="Profile" onerror=this.src="./img/Profile-None-Image.jpg" referrerpolicy="no-referrer" onclick="document.querySelector('.ProfileDropDown').classList.toggle('active')" ></li>` //referrerpolicy="no-referrer" to AVOID 403 "Forbidden" Error
//         nav.innerHTML += `
//             <div class="ProfileDropDown">
//                 <ul class="Menu">
//                     <li><img src=${photo} alt="Profile" onerror=this.src="./img/Profile-None-Image.jpg" referrerpolicy="no-referrer" ></li>
//                     <li>
//                         <div class="userDetails">
//                             <div class="User_name">${User_Name}</div> 
//                             <div class="User_Email">${User_Email}</div> 
//                         </div>
//                     </li>
//                     <li><a>Favorites</a></li>
//                     <li><a>Settings</a></li>
//                     <li class="link-item"><a href="/logout" class="link">Logout</a></li>
//                 </ul>
//             </div>`
//         // profileDropDown.style.visibility = hidden;


//     }else{
//         ul.innerHTML += `<li class="link-item"><a href="/admin" class="link">LogIn</a></li>`
//         // ul.style.marginLeft = "78%";
//     }
//     })
// }

import { auth, onAuthStateChanged, signOut} from '../js/firebase.js'
let ul = document.querySelector('.link-container');
let navbar = document.querySelector('.navbar');
let profile = document.querySelector('.Profile');
let profileDropDown = document.querySelector('.ProfileDropDown');
let nav  = document.querySelector('.Nav');
// let logoutBtn = document.getElementById('LogOutBtn');
let page = decodeURI(location.pathname.split("/").pop()); 

// console.log(page);
window.onload = () => {
    auth.onAuthStateChanged((user) => {
    if(user){
        let photo = user.photoURL;
        let User_Name = user.displayName;
        let User_Email = user.email;
        // console.log(user.photoURL);
        console.log(auth.currentUser.photoURL)
        if(page == "admin"){
            ul.innerHTML += `<li class="link-item"><a href="/admin" class="link active">Dashboard</a></li>`
            // console.log(user);
        }
        else{
            ul.innerHTML += `<li class="link-item"><a href="/admin" class="link">Dashboard</a></li>`
        }
        // ul.innerHTML += `
        //     <li class="link-item"><a href="/logout" class="link">Logout</a></li>
        //    `
        navbar.innerHTML += `<li class="Profile"><img src=${photo} alt="Profile" onerror=this.src="./img/Profile-None-Image.jpg" referrerpolicy="no-referrer" onclick="document.querySelector('.ProfileDropDown').classList.toggle('active')" ></li>` //referrerpolicy="no-referrer" to AVOID 403 "Forbidden" Error
        if(nav){
            nav.innerHTML += `
            <div class="ProfileDropDown">
                <ul class="Menu">
                    <li><img src=${photo} alt="Profile" onerror=this.src="./img/Profile-None-Image.jpg" referrerpolicy="no-referrer" ></li>
                    <li>
                        <div class="userDetails">
                            <div class="User_name">${User_Name}</div> 
                            <div class="User_Email">${User_Email}</div> 
                        </div>
                    </li>
                    <li><a>Favorites</a></li>
                    <li><a>Settings</a></li>
                    <li class="link-item"><a href="/logout" class="link">Logout</a></li>
                </ul>
            </div>`
        }
        
        // profileDropDown.style.visibility = hidden;


    }else{
        // ul.innerHTML += `<li class="link-item"><a href="/admin" class="link">LogIn</a></li>`
        navbar.innerHTML += `<li class="Profile"><img src="./img/Profile-None-Image.jpg" alt="Profile" referrerpolicy="no-referrer" onclick="document.querySelector('.ProfileDropDown-LoggedOut').classList.toggle('active')" ></li>` //referrerpolicy="no-referrer" to AVOID 403 "Forbidden" Error
        if(nav){
            nav.innerHTML += `
            <div class="ProfileDropDown-LoggedOut">
                <ul class="Menu">
                    <li><img src="./img/Profile-None-Image.jpg" alt="Profile"></li>
                    <span>Hi !!</span>
                    <li class="link-item"><a href="/admin" class="link">LogIn</a></li>
                </ul>
            </div>`
        // ul.style.marginLeft = "78%";
        }   
    }
    })
}