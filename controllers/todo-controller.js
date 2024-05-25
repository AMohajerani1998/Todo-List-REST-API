const Todo = require("../models/todo-model");

async function loadAllTodos(req, res, next) {
    let todos;
    try {
        todos = await Todo.fetchAllTodos;
    } catch (error) {
        return next(error);
    }
    res.status(201).json({
        todos: todos,
    });
}

async function newTodo(req, res, next) {
    const todoTask = req.body.task
    const todo = new Todo(todoTask)
    let result;
    let todoId;
    try {
        result = await todo.saveTodo();
        todoId = result.insertedId
    } catch (error){
        return next(error)
    }
    todo.id = todoId.toString();
    res.status(301).json({
        message: 'Todo added successfully',
        createdTodo: todo
    })
}

function editTodo(req, res, next) {}

function deleteTodo() {}

module.exports = {
    loadAllTodos: loadAllTodos,
    newTodo: newTodo,
    editTodo: editTodo,
    deleteTodo: deleteTodo,
};
