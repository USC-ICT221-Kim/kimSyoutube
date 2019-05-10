import multer from "multer";
import routes from "./routes";

const multerVideo = multer({dest : "upload/videos/"});

export const localmiddleware = (req, res, next) => {
    res.locals.siteName = "KimTube";
    res.locals.routes = routes;

   
    res.locals.user = {
        isAuthenticated: false,
        id : 1
    };
    next();
}

export const uploadVideo = multerVideo.single("videoFile");