import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();

import "./Models/Video";
import "./Models/Comment";
import "./Models/User";


const PORT = process.env.PORT || 4000;

const handlelistening = () => console.log(`Listening on: http://localhost:4000`);

app.listen(PORT, handlelistening);