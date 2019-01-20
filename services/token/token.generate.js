const jwt = require("jsonwebtoken");
const ms = require("ms");

const {
    ACCESS_TOKEN_KEY,
    ACCESS_TOKEN_EXP,
    REFRESH_TOKEN_KEY,
    REFRESH_TOKEN_EXP
} = require("../../config/env.keys");

class Token {
    constructor(context) {
        this.context = context;
        this.accessTokenExp = ms(ACCESS_TOKEN_EXP) / 1000;
    }
}

// For generating access token
Token.prototype.access = function access() {
    try {
        const accessToken = this.generate(ACCESS_TOKEN_KEY, ACCESS_TOKEN_EXP);

        this.accessToken = accessToken;

        return this;
    } catch (error) {
        throw error;
    }
};

// For generating refresh token
Token.prototype.refresh = function refresh() {
    try {
        const refreshToken = this.generate(
            REFRESH_TOKEN_KEY,
            REFRESH_TOKEN_EXP
        );

        this.refreshToken = refreshToken;

        return this;
    } catch (error) {
        throw error;
    }
};

// Common function for generating token [Don't use outside from Class]
Token.prototype.generate = function generate(key, exp) {
    const secret = Buffer.from(key, "base64");

    return jwt.sign(this.context, secret, {
        expiresIn: exp
    });
};

module.exports = Token;
