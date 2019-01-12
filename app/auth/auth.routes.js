const router = require("express").Router();

const { authSignup } = require("./auth.controller");

router.post("/signup", authSignup);

module.exports = router;
