import express from 'express';
import routes from '../routes';
import { getUploadVideo, videoDetail, deleteVideo, postUploadVideo, getEditVideo, postEditVideo } from '../controllers/videoController';
import { uploadVideo, onlyPrivate } from '../middlewares';


const videoRouter = express.Router();

// Upload
videoRouter.get(routes.uploadVideo, onlyPrivate, getUploadVideo);
videoRouter.post(routes.uploadVideo, onlyPrivate, uploadVideo ,postUploadVideo);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

// Delete Video
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
