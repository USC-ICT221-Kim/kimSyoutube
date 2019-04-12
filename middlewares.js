import routes from "./routes";

export const localmiddleware = (req, res, next) => {
    res.locals.siteName = "KimTube";
    res.locals.routes = routes;
    next();
}