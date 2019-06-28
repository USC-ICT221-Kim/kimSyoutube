import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: "File Url is very Required",
    },
    title : {
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
    },
    comments : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const model = mongoose.model("Video", VideoSchema);
export default model;