const authSignup = (req, res, next) => {
    try {
        res.status(200).json({ message: "this is auth" });
    } catch (error) {
        next(error);
    }
};

module.exports = { authSignup };
