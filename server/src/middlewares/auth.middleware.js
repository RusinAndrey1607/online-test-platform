const ApiError = require('../exceptions/api.error');

const authMiddleware = async function (req, res, next) {
    if (!req.cookies.userData) {
        return next(ApiError.UnauthorizedError("User not authenticated"));
    }
    req.user =  JSON.parse(req.cookies.userData);
    next();
};
module.exports = authMiddleware