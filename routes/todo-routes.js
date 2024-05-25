const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo-controller");

router.get('/', todoController.loadAllTodos);

router.post('/', todoController.newTodo);

router.patch('/:id', todoController.editTodo)

router.delete('/:id', todoController.deleteTodo)

module.exports = router;