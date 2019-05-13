import passport from "passport";
import routes from "../routes";
import User from "../Models/User";

export const getJoin = (req, res) => {
    res.render("Join", { pageTitle : "Join"});
};

export const postJoin = async (req, res, next) =>{
    const {
        body: {name, email, password, password2}
    } = req;
    if (password !== password2){
        res.status(400);
        res.render("Join", { pageTitle : "Join"});
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



export const getLogin = (req, res) => {
    res.render("LogIN", { pageTitle : "Log In"})
};

export const postLogin = passport.authenticate("local", {
    successRedirect: routes.home,
    failureRedirect: routes.login

});

export const logout = (req, res) => {
    // To Do: Process of Log Out
    res.redirect(routes.home);
};


export const userDetail = (req, res) => res.render("userDetail", { pageTitle : "User Detail"});
export const editProfile = (req, res) => res.render("editProfile", { pageTitle : "Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword", { pageTitle : "Change Password"});


// export const user = (req, res) => res.render ("User", { pageTitle : "User"});
