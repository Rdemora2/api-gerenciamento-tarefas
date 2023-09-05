const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const taskController = require('../controllers/taskController');

// Rota de criação de tasks
router.post('/', authenticationMiddleware, taskController.createTask);

// Rota de listagem geral de tasks
router.get('/', taskController.getAllTasks);

// Rota de listagem de tasks por ID
router.get('/:taskId', taskController.getTaskById);

// Rota de listagem de tasks por status
router.get('/status/:status', taskController.getTasksByStatus);

// Rota de edição de tasks
router.put('/:taskId', authenticationMiddleware, taskController.updateTask);

// Rota de exclusão de tasks
router.delete('/:taskId', authenticationMiddleware, taskController.deleteTask);

module.exports = router;
