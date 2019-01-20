const router = require("express").Router();

const isAuth = require("../middlewares/request.verify.accessToken");

const auth = require("./auth/auth.routes");
const todo = require("./to-do/todo.routes");

router.use("/auth", auth);
router.use("/todo", isAuth, todo);

module.exports = router;
