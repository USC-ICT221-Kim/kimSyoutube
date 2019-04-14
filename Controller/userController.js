export const join = (req, res) => res.render("Join", { pageTitle : "Join"});
export const login = (req, res) => res.render("LogIN", { pageTitle : "Log In"});
export const logout = (req, res) => res.render("LogOut", { pageTitle : "Log Out"});

export const user = (req, res) => res.render ("User", { pageTitle : "User"});
export const userDetail = (req, res) => res.render("User Detail", { pageTitle : "User Detail"});
export const editProfile = (req, res) => res.render("Edit User Profile", { pageTitle : "Edit User Profile"});
export const changePassword = (req, res) => res.render("Change Password", { pageTitle : "Change Password"});
