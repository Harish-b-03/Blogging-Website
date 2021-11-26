import {db, getDocs, collection } from "./firebase.js"
const blogSection = document.querySelector(".blogs-section");
const docRef = await getDocs(collection(db,"blogs"));
let blogId = decodeURI(location.pathname.split("/").pop());


const createBlog = (data) => {
    let title = data.title;
    let content = data.article;
    console.log("Length "+data.title.length);
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
        if(blogId != ""){
            blogId = blogId.slice(-4); // since Blog ID has 4 character 
        }
        // console.log(blogId);
        // console.log("3"+ blogId)
        // console.log(doc.data().id)
        if(doc.data().id != blogId){
            console.log("2"+ blogId)
            console.log(doc.data().id)
            createBlog(doc.data());
        }
    } else{
        location.replace("/");
    }
});