import routes from "../routes";
import Video from "../Models/Video";

export const home = async (req, res) => {
    try{
        const videos = await Video.find({}).sort({_id : -1});
        res.render("home", { pageTitle : "Home", videos});
    } catch(error) {
        res.render("home", { pageTitle : "Home", videos: []});
    }
    
};

// Search

export const search = async (req, res) => {
   
    const { 
        query: {term : searchingBy}
    } = req;
    let videos = [];
    try {
        videos = await Video.find({
            title : {$regex : searchingBy, $options : "i"}});
            
    // eslint-disable-next-line no-empty
    } catch (error) {}
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
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
    const {
        params : { id }
    } = req;
    try {
        const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle : video.title, video});
    } catch (error) {
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

export const deleteVideo = async (req, res) => {
    const {
        params : {id}
    } = req;
    try {
        await Video.findOneAndDelete({_id : id});
        res.redirect(routes.home);
        } catch (error) {res.redirect(routes.home);
    }

}

