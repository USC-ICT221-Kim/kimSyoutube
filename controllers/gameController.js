import routes from "../routes";

// eslint-disable-next-line import/prefer-default-export
export const getGameHome = (req, res) => {
    res.render("gamehome", {pageTitle : "GameHome"});
}