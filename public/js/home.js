import {db, getDocs, collection } from "./firebase.js"
const blogSection = document.querySelector(".blogs-section");
const docRef = await getDocs(collection(db,"blogs"));
let blogId = decodeURI(location.pathname.split("/").pop());


const createBlog = (data) => {
    blogSection.innerHTML += `<div class="blog-card">
    <img src="${data.bannerImage}" class="blog-image" alt=" ">
    <h1 class="blog-title">${data.title.substring(0,50) + '...'}</h1>
    <p class="blog-overview">${data.article.substring(0,100) + '....'}</p>
    <a href="/${data.title}-${data.id}" class="btn dark">read</a>`
}


docRef.forEach( (doc) => {
    if(doc.exists){
        blogId = decodeURI(location.pathname.split("/").pop());
        if(blogId != ""){
            blogId = blogId.slice(-4); // since Blog ID has 4 character 
        }
        // console.log(blogId);
        // console.log("3"+ blogId)
        // console.log(doc.data().id)
        if(doc.data().id != blogId){
            // console.log("2"+ blogId)
            // console.log(doc.data().id)
            createBlog(doc.data());
        }
    } else{
        location.replace("/");
    }
});