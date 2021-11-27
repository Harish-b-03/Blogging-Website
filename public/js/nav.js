import { auth, onAuthStateChanged, signOut } from '../js/firebase.js'
let ul = document.querySelector('.link-container');
// let logoutBtn = document.getElementById('LogOutBtn');
let page = decodeURI(location.pathname.split("/").pop()); 
// console.log(page);
auth.onAuthStateChanged((user) => {
    if(user){
        if(page == "admin"){
            ul.innerHTML += `<li class="link-item"><a href="/admin" class="link active">Dashboard</a></li>`
            // console.log(user);
        }
        else{
            ul.innerHTML += `<li class="link-item"><a href="/admin" class="link">Dashboard</a></li>`
        }
        ul.innerHTML += `
            <li class="link-item"><a href="/logout" class="link">Logout</a></li>
            `
    }else{
        ul.innerHTML += `<li class="link-item"><a href="/admin" class="link">LogIn</a></li>`
    }
})
