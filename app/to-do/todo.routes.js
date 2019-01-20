const router = require("express").Router();

const { todoCreate, todoList } = require("./todo.controller");

router
    .route("/")
    .post(todoCreate)
    .get(todoList);

module.exports = router;
