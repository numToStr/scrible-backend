const UserDAL = require("../user/user.dal");

const Password = require("../../services/password/password.service");
const TokenGenerator = require("../../services/token/token.generate");

// For signing up new user
const authSignup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Creating user dal with username or email
        const userDal = new UserDAL({
            $or: [{ username }, { email }]
        });

        // Checking if user is exists with same username or email
        const isUser = await userDal.getUser();

        // If exists return
        if (isUser) {
            if (isUser.username === username) {
                throw new $Error("User already exists with this username", 409);
            }

            throw new $Error("User already exists with this email", 409);
        }

        // Creating hash from plain text password
        const hash = await new Password(password).hash();

        const {
            createdAt,
            updatedAt,
            __v,
            password: pwd,
            ...user
        } = await userDal.createUser({ username, email, password: hash });

        // Generating access and refresh token
        const {
            accessToken,
            accessTokenExp,
            refreshToken
        } = new TokenGenerator({
            _id: user._id,
            role: ["user"]
        })
            .access()
            .refresh();

        res.status(200).json({
            success: true,
            message: "Signup successful",
            action: "login",
            user,
            accessToken,
            accessTokenExp,
            refreshToken
        });
    } catch (error) {
        next(error);
    }
};

// For logging in existing user
const authLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Checking if user exists with this username
        const isUser = await new UserDAL({ username }).getUser({
            select: "-createdAt -updatedAt -__v"
        });

        // If user doesn't exists => return
        if (!isUser) {
            throw new $Error("Invalid username or password", 409);
        }

        // If user exists => match password
        const isPasswordMatch = await new Password(password).verify(
            isUser.password
        );

        // If password not match => return
        if (!isPasswordMatch) {
            throw new $Error("Invalid username or password", 409);
        }

        // Generating access and refresh token
        const {
            accessToken,
            accessTokenExp,
            refreshToken
        } = new TokenGenerator({
            _id: isUser._id,
            role: ["user"]
        })
            .access()
            .refresh();

        const { password: pwd, ...user } = isUser;

        res.status(200).json({
            success: true,
            message: "Login Successful",
            action: "login",
            user,
            accessToken,
            accessTokenExp,
            refreshToken
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { authSignup, authLogin };
