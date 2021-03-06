const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload')

let initial_path = path.join(__dirname,"public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path,"home.html"));
})

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path,"editor.html"));
})


// upload link
app.post('/upload',(req, res) => {
    let file = req.files.image;
    let date = new Date();
    // image name
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let path = 'public/uploads/' + imagename;

    // create upload
    file.mv(path, (err, result) => {
        if(err){
            console.log(err);
        } else{
            // our image upload path
            res.json(`uploads/${imagename}`)
        }
    })
})

app.get("/admin", (req, res) => {
    res.sendFile(path.join(initial_path,"dashboard.html"));
})
app.get("/logout", (req, res) => {
    res.sendFile(path.join(initial_path,"logout.html"));
})

app.get("/:blog", (req, res) => { // link with anything after "/" ,other than the previous links, will be directed to Blog page
    // In "/':'", ":" used to tell that anything after / ,other than the previous links, will be redirected to below page 
    res.sendFile(path.join(initial_path,"blog.html"));
})

app.use((req, res) => {
    res.json("404");
})

try{
    app.listen("3000", () => {
        console.log('listening....');
    })
}catch(err){
    console.log(err);
}
