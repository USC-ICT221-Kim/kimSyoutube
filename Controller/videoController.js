import routes from "../routes";
import Video from "../Models/Video";

export const home = async (req, res) => {
    try{
        const videos = await Video.find({});
        console.log(videos);
        res.render("home", { pageTitle : "Home", videos});
    } catch(error) {
        console.log(error);
        res.render("home", { pageTitle : "Home", videos: []});
    }
    
};

export const search = (req, res) => {
    // This is Old One
    //const searchingBy = req.query.term;
    const {query: {term : searchingBy}} = req;
    res.render("search", { pageTitle : "Search", searchingBy, videos});
}

// export const video = (req, res) => res.render("video", { pageTitle : "Video"});
export const getUploadVideo = (req, res) => res.render("uploadVideo", { pageTitle : "Upload Video"});

export const postUploadVideo = async (req, res) => {
    const { body :
        {title, description},
        file : {path}
    } = req;
    const newVideo = await Video.create({
        fileUrl : path,
        title,
        description
    });
    console.log(newVideo);
    //To Do: upload and save video
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle : "Video Detail"});
export const editVideo = (req, res) => res.render("editVideo", { pageTitle : "Edit Video"});
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle : "Delete Video"});

