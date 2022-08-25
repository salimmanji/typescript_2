"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodos = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: 'Created todo!', createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.status(200).json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const toDoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (toDoIndex < 0) {
        throw new Error('could not find todo');
    }
    TODOS[toDoIndex] = new todo_1.Todo(TODOS[toDoIndex].id, updatedText);
    res.status(200).json({ message: 'Success', todo: TODOS[toDoIndex] });
};
exports.updateTodo = updateTodo;
const deleteTodos = (req, res, next) => {
    const todoId = req.params.id;
    const toDoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (toDoIndex < 0) {
        throw new Error('could not find todo');
    }
    TODOS.splice(toDoIndex, 1);
    res.status(201).json({ message: `Removed Todo with ID: ${todoId} from position ${toDoIndex}` });
};
exports.deleteTodos = deleteTodos;
