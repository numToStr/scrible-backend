const TodoModel = require("./todo.model");

class TodoDAL {
    constructor(context = {}) {
        this.context = context;
        this.select = "-user -updatedAt -__v";
    }
}

TodoDAL.prototype.createTodo = function createTodo(data, saved = false) {
    const newTodo = new TodoModel(data);
    const savedTodo = newTodo.save();

    return saved ? savedTodo : newTodo;
};

TodoDAL.prototype.getTodos = function getTodos() {
    return TodoModel.find(this.context)
        .select(this.select)
        .sort({ createdAt: -1 })
        .exec();
};

module.exports = TodoDAL;
