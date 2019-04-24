import routes from "../routes";

export const home = (req, res) => {
    res.render("home", { pageTitle : "Home", videos});
};

export const search = (req, res) => {
    // This is Old One
    //const searchingBy = req.query.term;
    const {query: {term : searchingBy}} = req;
    res.render("search", { pageTitle : "Search", searchingBy, videos});
}

// export const video = (req, res) => res.render("video", { pageTitle : "Video"});
export const getUploadVideo = (req, res) => res.render("uploadVideo", { pageTitle : "Upload Video"});

export const postUploadVideo = (req, res) => {
    const {
        body: {file, title, description}
    } = req;
    //To Do: upload and save video
    res.redirect(routes.videoDetail(12345));
};

export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle : "Video Detail"});
export const editVideo = (req, res) => res.render("editVideo", { pageTitle : "Edit Video"});
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle : "Delete Video"});

