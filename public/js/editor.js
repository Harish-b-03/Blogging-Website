
import { app, db, addDoc, getDocs, collection, auth, onAuthStateChanged } from "./firebase.js"
let page = decodeURI(location.pathname.split("/").pop());
// console.log(page);
if(page != ""){ // To allow User to view the Home Page WITHOUT Logging In
    auth.onAuthStateChanged((user)=>{
        if(!user){
            location.replace("/admin")
        }
    })
}

console.log(auth.currentUser.displayName)

const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');

//banner
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector('.banner');
let bannerPath;

const publishBtn = document.querySelector('.publishbtn');
const uploadInput = document.querySelector('#image-upload');
// console.log(publishBtn)
if(bannerImage){ // to rectify the "null" error due to the next line BEFORE uploading. CONTEXT: bannerImage.addEventListener is returning null BEFORE uploading the image and causing error
    bannerImage.addEventListener('change', () => {
        uploadImage(bannerImage,"banner");
    })
}

if(uploadInput){ // to rectify the "null" error due to the next line BEFORE uploading. CONTEXT: uploadInput.addEventListener is returning null BEFORE uploading the image and causing error
    uploadInput.addEventListener('change', () => {
        uploadImage(uploadInput,"image"); // to get/upload image in the article field
    })
}

const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if(file && file.type.includes("image")){
        const formdata = new FormData();
        formdata.append('image',file);

        fetch('/upload', {    // " fetch('/upload,{}) " is syntax and /upload != /uploads(in folder structure)
            method:'post',
            body: formdata
        }).then(res => res.json())
        .then(data => {
            if(uploadType == "image"){
                addImage(data, file.name)
            }else{
                bannerPath = `${location.origin}/${data}`;  // to upload banner image in the banner field
                banner.style.backgroundImage = `url("${bannerPath}")`; 
            }
        })
    }else{
        alert("Upload Image Only");
    }
}

const addImage = (imagepath, alt) => {
    let curPos = articleField.selectionStart;
    let textToInsert =  `\r![${alt}](${imagepath})\r`;
    articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos); //inserting the image path in the articleField
}

if(publishBtn)// to rectify the "null" error due to the next line BEFORE uploading. CONTEXT: publishBtn.addEventListener is returning null BEFORE clicking the btn and causing error
    publishBtn.addEventListener('click', () => uploadDoc());

async function uploadDoc(){
    // console.log(`${articleField.value.length}`)
    if(articleField.value.length && blogTitleField.value.length){
        // generating ID
        
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(" ").join("-");
        let blogId = '';
        for(let i=0; i<4; i++){ // if the number of iterations i.e., 4 is changed Please change the slice() to accordingly.
            blogId += letters[Math.floor(Math.random() * letters.length)];
        }

        // settings up docName
        let docName = `${blogTitle}-${blogId}`;
        let date = new Date(); // for "published at" info
        let months =["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        // console.log("Before DB call")
        // console.log(db)
        //Pushing blog to Firestore
        // db.collection("blogs").doc(docName).set({
        //     title: blogTitleField.value,
        //     article: articleField.value,
        //     bannerImage: bannerPath,
        //     publishedAt: `${date.getDate()} ${months[date.getMonth]} ${date.getFullYear()}`
        // })
        try{
        const doc = await addDoc(collection(db, "blogs"),{
            id: blogId,
            title: blogTitleField.value,
            article: articleField.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`,
            author: auth,
        })
        .then(() => {
            location.href = `/${docName}`;
        })
        }catch(err){
            console.log(err);
            alert(err);
        }
    }
}