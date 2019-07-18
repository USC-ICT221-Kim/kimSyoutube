import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
});


const db = mongoose.connection;

// eslint-disable-next-line no-console
const handleOpen = () => console.log("Connected to DB");
// eslint-disable-next-line no-console
const handleError = error => console.log(`DB Connection : ${error}`);

db.once("open",handleOpen);
db.on("error", handleError);

