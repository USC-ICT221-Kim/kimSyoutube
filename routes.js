// Global

const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users

const USER = "/user";
const EDIT_PROFILE = "/edit-profile";
const USER_DETAIL = "/:id";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

// Videos

const VIDEO = "/video";
const UPLOADVIDEO = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// Github

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// API

const API = "/api";
const REGISTER_VIEW ="/:id/view";

// Comment

const ADD_COMMENT = "/:id/comment";
const DELETE_COMMENT = "/:id/comment/delete";

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
        } 
            return USER_DETAIL
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    
    video: VIDEO,
    uploadVideo: UPLOADVIDEO,
    videoDetail: (id) =>{
        if(id){
            return `/video/${id}`;
        } 
            return VIDEO_DETAIL
    },
    editVideo: (id) => {
        if (id){
            return `/video/${id}/edit`;
        } 
            return EDIT_VIDEO
        },
    deleteVideo: (id) => {
        if (id) {
            return `/video/${id}/delete`;
        } 
            return DELETE_VIDEO
        },
        gitHub: GITHUB,
        githubCallback: GITHUB_CALLBACK,
        me: ME,
        api: API,
        registerView: REGISTER_VIEW,
        addComment : ADD_COMMENT,
        deleteComment : DELETE_COMMENT
};

export default routes;