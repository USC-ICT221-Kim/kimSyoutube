import express from 'express';
import routes from '../routes';
import { getUploadVideo, videoDetail, deleteVideo, postUploadVideo, getEditVideo, postEditVideo } from '../Controller/videoController';
import { uploadVideo } from '../middlewares';


const videoRouter = express.Router();

// Upload
videoRouter.get(routes.uploadVideo, getUploadVideo);
videoRouter.post(routes.uploadVideo, uploadVideo ,postUploadVideo);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

// Delete Video
videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;
