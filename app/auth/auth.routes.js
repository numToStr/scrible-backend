const router = require("express").Router();

const $validator = require("../../middlewares/request.validator");

const { signupSchema, loginSchema } = require("./auth.validation");
const { authSignup, authLogin } = require("./auth.controller");

router.post("/signup", $validator(signupSchema), authSignup);
router.post("/login", $validator(loginSchema), authLogin);

module.exports = router;
