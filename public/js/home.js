import {db, getDocs, collection, auth, onAuthStateChanged } from "./firebase.js"

// const firebaseConfig = {
//     apiKey: "AIzaSyDk-C0c-L12JY7RaWTF1fBHa-2BAGS7F80",
//     authDomain: "blogging-website-791a0.firebaseapp.com",
//     projectId: "blogging-website-791a0",
//     storageBucket: "blogging-website-791a0.appspot.com",
//     messagingSenderId: "666347440620",
//     appId: "1:666347440620:web:de3bdd685d611e6cca58c9"
// };
// const app = firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const db = firebase.firestore(app);
// const getDocs = firebase.auth().getDocs();
// const collection = db.collection();

// console.log(location.pathname)

const blogSection = document.querySelector(".blogs-section");
const docRef = await getDocs(collection(db,"blogs"));
let blogId = decodeURI(location.pathname.split("/").pop());

const createBlogCard = (data) => {
    let title = data.title;
    let content = data.article;
    // console.log("Length "+data.title.length);
    if(title.length>70){
        title = title.substring(0,70)+'...';
    }
    if(content.length>100){
        content = content.substring(0,100)+'...';
    }
    blogSection.innerHTML += `<div class="blog-card">
    <img src="${data.bannerImage}" class="blog-image" alt=" ">
    <h1 class="blog-title">${title}</h1>
    <p class="blog-overview">${content}</p>
    <a href="/${data.title}-${data.id}" class="btn dark">read</a>`
}


docRef.forEach( (doc) => {
    if(doc.exists){
        blogId = decodeURI(location.pathname.split("/").pop());

        if(blogId == "admin"){ // Setting up Blog Cards FOR DASHBOARD -> blogs created By that particular user
            if(auth.currentUser){
                let User_Name = auth.currentUser.displayName;
                let User_UID = auth.currentUser.uid;
                if(doc.data().author_id == User_UID && doc.data().author_name == User_Name){
                    // console.log(doc.data().author_id + " -- " + doc.data().author_name + " -- " + doc.data().author_email)
                    // console.log(User_UID + " -- " + User_Name + " -- " + auth.currentUser.email)
                    createBlogCard(doc.data());
                }
            }else{
                console.log("Home.js Auth.currentUser NOT Defined")
            }
            
        }
        else{
            if(blogId != ""){
                blogId = blogId.slice(-4); // since Blog ID has 4 character 
            }
            // console.log(blogId);
            // console.log(doc.data().id)
            if(doc.data().id != blogId){
                // console.log(doc.data().id)
                createBlogCard(doc.data());
            }
        }
    } else{
        location.replace("/");
    }
});