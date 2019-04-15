import {videos} from "../db"

export const home = (req, res) => {
    res.render("home", { pageTitle : "Home", videos});
};

export const search = (req, res) => {
    // This is Old One
    //const searchingBy = req.query.term;
    const {query: {term : searchingBy}} = req;
    res.render("search", { pageTitle : "Search", searchingBy, videos});
}

export const video = (req, res) => res.render("video", { pageTitle : "Video"});
export const uploadVideo = (req, res) => res.render("uploadVideo", { pageTitle : "Upload Video"});
export const videoDetail = (req, res) => res.render("Video Detail", { pageTitle : "Video Detail"});
export const editVideo = (req, res) => res.render("Edit Video", { pageTitle : "Edit Video"});
export const deleteVideo = (req, res) => res.render("Delete Video", { pageTitle : "Delete Video"});
