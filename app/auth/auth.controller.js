const Password = require("../../services/password/password.service");

const UserDAL = require("../user/user.dal");

const authSignup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const userDal = new UserDAL({
            $or: [{ username }, { email }]
        });

        const isUser = await userDal.getUser();

        if (isUser) {
            if (isUser.username === username) {
                throw new $Error("User already exists with this username", 409);
            }

            throw new $Error("User already exists with this email", 409);
        }

        const hash = await new Password(password).hash();

        await userDal.createUser({ username, email, password: hash });

        res.status(200).json({
            success: true,
            message: "User successfully created",
            action: "login"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { authSignup };
