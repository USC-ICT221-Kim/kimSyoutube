import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: "File Url is very Required",
    },
    videoTitle : {
        type: String,
        required: "Type is Required",
    },
    description: String,
    views : {
        type : Number,
        default : 0,
    },
    createdAt : {
        type : Date,
        default : Date.now,
    }
});

const model = mongoose.model("Video", VideoSchema);
export default model;