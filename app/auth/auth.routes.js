const router = require("express").Router();

const $validator = require("../../middlewares/request.validator");
const isAuth = require("../../middlewares/request.verify.accessToken");
const { signupSchema, loginSchema, tokenSchema } = require("./auth.validation");

const {
    authenticate,
    authRefresh,
    authSignup,
    authLogin
} = require("./auth.controller");

router.get("/", isAuth, authenticate);
router.get("/refresh", $validator(tokenSchema, "query"), authRefresh);
router.post("/signup", $validator(signupSchema), authSignup);
router.post("/login", $validator(loginSchema), authLogin);

module.exports = router;
