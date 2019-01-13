const TokenVerifier = require("../services/token/token.verify");

/**
 * Middleware for verifying token and protecting routes
 * Token should be sended along with http request
 * Token should be in authorization header
 *
 * Token Format ====
 * authorization: Basic <token>
 */
const verifyToken = (req, res, next) => {
    try {
        // Getting the Authorization header
        const bearerHeader = req.get("Authorization");

        // Check if any value is present in Authorization header or not
        if (!bearerHeader) {
            return res.sendStatus(403);
        }

        // Getting the code and token from the bearer
        // Spliting the type and the token
        // Taking out the code and token
        const [code, token] = bearerHeader.split(" ");

        if (code !== "Basic") {
            throw new $Error("Unauthorized Access! Please login", 401);
        }

        // Verifying the token, if error => return
        const { accessDecoded } = new TokenVerifier(token).access();

        // Forwarding the decoded token to next middleware
        req.$user = accessDecoded;
        next();
    } catch (error) {
        // If any error comes while verifying the token sending unauthorized
        next(error);
    }
};

module.exports = verifyToken;
