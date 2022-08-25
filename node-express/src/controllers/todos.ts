import { Request } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as {text: string}).text;
    const newTodo = new Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({message: 'Created todo!', createdTodo: newTodo});
}

export const getTodos: RequestHandler = (req, res, next) => {
    res.status(200).json({todos: TODOS});
}

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = (req.body as {text: string}).text;

    const toDoIndex = TODOS.findIndex(todo => todo.id === todoId);

    if (toDoIndex < 0) {
        throw new Error('could not find todo');
    }
    TODOS[toDoIndex] = new Todo(TODOS[toDoIndex].id, updatedText);

    res.status(200).json({message: 'Success', todo: TODOS[toDoIndex]});
}

export const deleteTodos: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;

    const toDoIndex = TODOS.findIndex(todo => todo.id === todoId);

    if (toDoIndex < 0) {
        throw new Error('could not find todo');
    }

    TODOS.splice(toDoIndex, 1);

    res.status(201).json({message: `Removed Todo with ID: ${todoId} from position ${toDoIndex}`});
}