import passport from "passport";
import routes from "../routes";
import User from "../Models/User";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle : "Join"});
};

export const postJoin = async (req, res, next) =>{
    const {
        body: {name, email, password, password2}
    } = req;
    if (password !== password2){
        req.flash('error', 'Password Do not Match!!!');
        res.status(400);
        res.render("join", { pageTitle : "Join"});
    } else {
       try {
        const user = await User({
            name,
            email
        });
        await User.register(user, password);
        next();
    } catch (error){
        // eslint-disable-next-line no-console
        console.log(error);
        res.redirect(routes.home);
    }
}
};

export const githubLogin = passport.authenticate("github");

export const postGithubLogin = (req, res) =>{
    res.redirect(routes.home);
};

// export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => {


export const githubLoginCallback = async (_, __, profile, cb) => {
    const { 
        _json: {id, avatar_url: avatarUrl, name, email}
    } = profile;
    try {{
        const user = await User.findOne({email});
        if (user){
            user.githubId = id;
            user.avatarUrl = avatarUrl;
            user.save();
            return cb(null, user);
        }
            const newUser = await User.create({
                email,
                name,
                githubId: id,
                avatarUrl
            });
            return cb(null, newUser);
        }    
    } catch (error) {
        return cb(error);
    }
  };

export const getLogin = (req, res) => {
    res.render("login", { pageTitle : "Log In"})
};

export const postLogin = passport.authenticate("local", {
    successRedirect: routes.home,
    failureRedirect: routes.login,
    successFlash: "Welcome to KimS Web page",
    failureFlash: "Cannot Log In... Please Check email or password"

});

export const logout = (req, res) => {
    req.logout();
    req.flash('info', 'GoodBye~');
    res.redirect(routes.home);
};

export const getMe = (req,res) =>{
    res.render("userDetail", { pageTitle : "User Detail", user: req.user });
}

// User Detail

export const userDetail = async (req, res) => {
    const { params: { id } } = req;
    try {
        const user = await User.findById(id).populate("videos");
        res.render("userDetail", { pageTitle : "User Detail", user});
    } catch (error) {
        res.redirect(routes.home);
    }
}


export const getEditProfile = (req, res) => {
    res.render("editProfile", { pageTitle : "Edit Profile"});
}

export const postEditProfile = async (req, res) => {
    const { 
        body: {name, email},
        file
    } = req;
    try {
      await User.findByIdAndUpdate(req.user.id,{
          name,
          email,
          avatarUrl: file ? file.path : req.user.avatarUrl
      });  
      res.redirect(routes.me);
    } catch (error) {
        res.render("editProfile", { pageTitle: "Edit Profile" });
    }
};

export const getChangePassword = (req, res) => res.render("changePassword", { pageTitle : "Change Password"});

export const postChangePassword = async(req, res) => {
    const {
        body: { oldPassword, newPassword, newPassword1}
        } = req;
    
    try {
        if (newPassword !== newPassword1){
            res.status(400);
            res.redirect(`/user/${routes.changePassword}`);
            return;
        }
        
        await req.user.changePassword(oldPassword, newPassword);
        res.redirect(routes.me);
    } catch (error) {
        res.status(400);
        res.redirect(`/user/${routes.changePassword}`);
        
    }
};

// export const user = (req, res) => res.render ("User", { pageTitle : "User"});
