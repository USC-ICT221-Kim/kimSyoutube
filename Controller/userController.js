export const join = (req, res) => res.render("Join", { pageTitle : "Join"});
export const login = (req, res) => res.render("LogIN", { pageTitle : "Log In"});
export const logout = (req, res) => res.render("LogOut", { pageTitle : "Log Out"});
export const userDetail = (req, res) => res.render("userDetail", { pageTitle : "User Detail"});
export const editProfile = (req, res) => res.render("editProfile", { pageTitle : "Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword", { pageTitle : "Change Password"});


// export const user = (req, res) => res.render ("User", { pageTitle : "User"});
