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
        file : { path }
    } = req;
    const newVideo = await Video.create({
        fileUrl : path,
        title,
        description
    });
    // console.log(newVideo);
    //To Do: upload and save video
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
    const {
        params : { id }
    } = req;
    try {
        const video = await Video.findById(id);
    console.log(video);
    res.render("videoDetail", { pageTitle : "Video Detail", video});
    } catch (error) {
        //console.log(error);
        res.redirect(routes.home);
    }
};

export const getEditVideo =  async (req, res) => {
    const {
        params : { id }
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("editVideo", { pageTitle : `Edit ${video.title}`, video});
    }   catch (error) {
        res.redirect(routes.home);
    }
}
    
export const postEditVideo = async (req, res) => {
    const {
        params: {id},
        body : {title, description}
    } = req;
    try {
        // No need to store it
        // Simply update Video body
        await Video.findOneAndUpdate({_id : id},{title, description});
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    }
}

export const deleteVideo = (req, res) => 
    res.render("deleteVideo", { pageTitle : "Delete Video", video});

