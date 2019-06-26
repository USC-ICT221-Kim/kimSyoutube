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

// Todo: Fix this problem later (Github social Log in)
// export const githubLoginCallback = function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ githubId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   };

export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => {
    const { _json: {id, avatarUrl, name, email}} = profile;
    try {{
        const user = await User.findOne({email});
        if (user){
            user.githubId = id;
            user.save();
            return cb(null, user);
        }
            const newUser = await User.create({
                email,
                name,
                githubId: id,
                avatarurl: avatarUrl
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
    failureRedirect: routes.login

});

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
};


export const userDetail = (req, res) => res.render("userDetail", { pageTitle : "User Detail"});
export const editProfile = (req, res) => res.render("editProfile", { pageTitle : "Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword", { pageTitle : "Change Password"});


// export const user = (req, res) => res.render ("User", { pageTitle : "User"});
