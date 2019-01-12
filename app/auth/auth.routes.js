const router = require("express").Router();

const { authSignup, authLogin } = require("./auth.controller");

router.post("/signup", authSignup);
router.post("/login", authLogin);

module.exports = router;
