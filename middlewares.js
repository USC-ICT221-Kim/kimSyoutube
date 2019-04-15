import routes from "./routes";

export const localmiddleware = (req, res, next) => {
    res.locals.siteName = "KimTube";
    res.locals.routes = routes;

    // Fake user
    //To test log in and log out function
    res.locals.user = {
        isAuthenticated: true,
        id : 1
    }
    next();
}