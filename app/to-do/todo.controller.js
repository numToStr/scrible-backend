const TodoDAL = require("./todo.dal");

const todoCreate = (req, res, next) => {
    try {
        const {
            $user: { $id },
            body: { title, desc }
        } = req;

        const todo = new TodoDAL().createTodo({ title, desc, user: $id });

        res.status(200).json({
            success: true,
            message: "Todo successfully created",
            todo
        });
    } catch (error) {
        next(error);
    }
};

const todoList = async (req, res, next) => {
    try {
        const { $id } = req.$user;

        const todos = await new TodoDAL({ user: $id }).getTodos();

        res.status(200).json({
            success: true,
            message: "Successful",
            todos
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    todoCreate,
    todoList
};
