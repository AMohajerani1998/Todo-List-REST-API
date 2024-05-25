const Todo = require("../models/todo-model");

async function loadAllTodos(req, res, next) {
    let todos;
    try {
        todos = await Todo.fetchAllTodos();
    } catch (error) {
        return next(error);
    }
    res.json({
        todos: todos,
    });
}

async function newTodo(req, res, next) {
    const todoTask = req.body.task;
    const todo = new Todo(todoTask);
    let result;
    let todoId;
    try {
        result = await todo.saveTodo();
        todoId = result.insertedId;
    } catch (error) {
        return next(error);
    }
    todo.id = todoId.toString();
    res.status(301).json({
        message: "Todo added successfully",
        createdTodo: todo,
    });
}

async function editTodo(req, res, next) {
    const todoId = req.params.id;
    const newTodoTask = req.body.task;
    const todo = new Todo(newTodoTask, undefined, todoId);
    try {
        await todo.saveTodo();
    } catch (error) {
        return next(error);
    }
    res.json({
        message: "Todo editted successfully!",
        todo: todo,
    });
}

async function deleteTodo(req, res, next) {
    const todoId = req.params.id;
    const todo = new Todo(undefined, undefined, todoId)
    try {
        await todo.deleteTodo();
    } catch (error) {
        return next(error);
    }
    res.json({
        message: 'Todo was removed successfully'
    })
}

module.exports = {
    loadAllTodos: loadAllTodos,
    newTodo: newTodo,
    editTodo: editTodo,
    deleteTodo: deleteTodo,
};
