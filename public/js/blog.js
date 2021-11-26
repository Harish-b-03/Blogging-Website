import { db, collection, getDocs } from "./firebase.js"
const docRef = await getDocs(collection(db, "blogs"));
let blogId = decodeURI(location.pathname.split("/").pop());
const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);
    // console.log(data);

    data.forEach(item => {
        // check for heading
        if(item[0] == "#"){
            let hcount = 0;
            let i =0;
            while(item[i] == '#'){
                hcount++;
                i++;
            }
            let tag = `h${hcount}`;
            ele.innerHTML += `<${tag}>${item.slice(hcount,item.length)}</${tag}>`
        }
        // checking for Image Format
        else if(item[0] =='!' && item[1] == "["){
            let separator;
            for(let i=0;i<= item.length;i++){
                if(item[i] =="]" && item[i+1] == '(' && item[item.length-1]==")"){
                    separator = i;
                }
            }

            let alt = item.slice(2,separator);
            let src = item.slice(separator+2, item.length-1);
            ele.innerHTML += `<img src="${src}" alt="${alt}" class="article-image"></img>`;
            // console.log(`<img src="${src}" alt="${alt}" class="article-image"></img>`)
        } 
        else{
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
}

const setupBlog = (data) => {
    const banner = document.querySelector(".banner");
    const blog = document.querySelector(".blog");
    const blogTitle = document.querySelector(".title");
    const titleTag = document.querySelector("title");
    const publishedAt = document.querySelector(".publishedAt");
    const article = document.querySelector(".article");

    banner.style.backgroundImage = `url(${data.bannerImage})`;
    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    publishedAt.innerHTML += data.publishedAt;   
    console.log(data);
    addArticle(article, data.article);
}

docRef.forEach( (doc) => {
    if(doc.exists){
        blogId = decodeURI(location.pathname.split("/").pop());
        blogId = blogId.slice(-4); // since Blog ID has 4 character 
        console.log(blogId);
        if(doc.data().id == blogId){
            console.log(blogId)
            setupBlog(doc.data());
        }
    } else{
        location.replace("/");
    }
});