import { create } from 'domain';
import { Router } from 'express';
// const express = require('express);
// const Router = express.Router();

import { createTodo, getTodos, updateTodo, deleteTodos } from '../controllers/todos';

const router = Router();

router.post('/', createTodo);

router.get('/', getTodos);

router.patch('/:id', updateTodo);

router.delete('/:id', deleteTodos);

export default router;