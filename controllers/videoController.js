import routes from "../routes";
import Video from "../Models/Video";
import Comment from "../Models/Comment";

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
    const { 
        body : { title, description },
        file : { path }
    } = req;
    const newVideo = await Video.create({
        fileUrl : path,
        title,
        description,
        creator: req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
    const {
        params : { id }
    } = req;
    try {
        const video = await Video.findById(id).populate("creator").populate("comments");
        res.render("videoDetail", { pageTitle: video.title, video});
    }   catch (error) {
        res.redirect(routes.home);
    }
};

// Edit Video

export const getEditVideo =  async (req, res) => {
    const {
        params : { id }
    } = req;
    try {
        const video = await Video.findById(id);
        if (video.creator !== req.user.id){
            res.render("editVideo", { pageTitle : `Edit ${video.title}`, video});
        }   else {
            throw Error();

        }
    }   catch (error) {
        res.redirect(routes.home);
    }
}
    
export const postEditVideo = async (req, res) => {
    const {
        params: { id },
        body : { title, description }
    } = req;
    try {
        // No need to store it
        // Simply update Video body
        await Video.findOneAndUpdate({ _id : id },{title, description});
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    }
}

export const deleteVideo = async (req, res) => {
    const {
        params : { id }
    } = req;
    try {
        const video = await Video.findById(id);
        if (video.creator !== req.user.id){
            res.redirect(routes.home);
        } else {
            throw Error();

        }
        await Video.findOneAndDelete({_id : id});
        } catch (error) {res.redirect(routes.home);
    }

}

// Register Video View

export const postRegisterView = async (req, res) =>{
    const { 
        params: { id }
    } = req;
    try { 
        const video = await Video.findById(id)
        video.views += 1;
        video.save();
        res.status(200);
    } catch (error) {
        res.status(400);
    } finally{
        res.end();
    }
    
};

// Add Comment

export const postAddComment = async(req, res) => {
    const {
        params: { id },
        body: { comment },
        user
    } = req;
    try {
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            text: comment,
            creator : user.id
        });
    video.comments.push(newComment.id);
    video.save();
    res.send(JSON.stringify(newComment));
    } catch (error) {
      res.status(400);  
    } finally{
        res.end();
    }
}

// Delete Comments

export const postDeleteComment = async (req, res) => {
    const {
      params: { id },
      user
    } = req;
    try {
      const comment = await Comment.findById(id);
      if (String(comment.creator) !== user.id) {
        throw Error();
      } else {
        await Comment.findOneAndRemove({ _id: id });
      }
    } catch (error) {
      res.status(400);
    } finally {
      res.end();
    }
  };
