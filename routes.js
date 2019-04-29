// Global

const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//Users

const USER = "/user";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

//Videos

const VIDEO = "/video";
const UPLOADVIDEO = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,

    user: USER,
    userDetail: (id) =>{
        if(id){
            return `/user/${id}`;
        } else {
            return USER_DETAIL
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    
    video: VIDEO,
    uploadVideo: UPLOADVIDEO,
    videoDetail: (id) =>{
        if(id){
            return `/video/${id}`;
        } else {
            return VIDEO_DETAIL
        }
    },
    editVideo: (id) => {
        if (id){
            return `/video/${id}/edit`;
        } else {
            return EDIT_VIDEO
        }
    },
    deleteVideo: (id) => {
        if (id) {
            return `/video/${id}/delete`;
        } else {
            return DELETE_VIDEO
        }
    }

};

export default routes;