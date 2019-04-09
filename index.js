import express from 'express';


const app = express();

const PORT = 4000;

//Same function
// using arrow function looks much better (easy to understand)
const  handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

const handlHome = (req, res) => res.send("Hello from Home");

const handleProfile = (req, res) => res.send("Your on my Profile");

app.get("/", handlHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);