const ApiError = require('../exceptions/api.error');

module.exports = function (requiredRole) {
    return function (req, res, next) {
        if (!req.user) {
            return next(ApiError.UnauthorizedError("User not authenticated"));
        }

        if (req.user.role !== requiredRole) {
            return next(ApiError.Forbidden(`You do not have permission to perform this action. Required role: ${requiredRole}`));
        }

        next();
    };
};