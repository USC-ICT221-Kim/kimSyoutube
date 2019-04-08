const express = require('express');
const app = express();

const PORT = 4000;

function handleListening(){
    console.log(`Listening on: http://localhost:${PORT}`);
}

function handlHome(req, res){
    console.log(req);
    res.send("Hello from Home");
}

function handleProfile(req, res){
    res.send("Your on my Profile");
}

app.get("/", handlHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);