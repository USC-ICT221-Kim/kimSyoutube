import "./db" 
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./Models/Video";
import "./Models/Comment";


const PORT = process.env.PORT;

const handlelistening = () => console.log(`Listening on: http://localhost:4000`);

app.listen(PORT, handlelistening);