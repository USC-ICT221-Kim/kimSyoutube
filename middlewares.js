import multer from "multer";
import routes from "./routes";

const multerVideo = multer({dest : "upload/videos/"});

export const localmiddleware = (req, res, next) => {
    res.locals.siteName = "KimTube";
    res.locals.routes = routes;
    res.locals.user = req.user || null;
    // eslint-disable-next-line no-console
    console.log(req.user);
    next();
}

export const uploadVideo = multerVideo.single("videoFile");