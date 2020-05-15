// this grant the admin acces to the features on the app

module.exports = function (req, res, next) {
    

    if (!req.user.isAdmin) return res.status(403).send("Access denied");

    next();
}