const express = require('express');
const app = express();

const taskController = require('./controllers/taskController');
const authenticationMiddleware = require('./middlewares/authenticationMiddleware');


app.post('/api/tasks', authenticationMiddleware, taskController.createTask);
app.get('/api/tasks', authenticationMiddleware, taskController.getAllTasks);
app.get('/api/tasks/:taskId', authenticationMiddleware, taskController.getTaskById);
app.put('/api/tasks/:taskId', authenticationMiddleware, taskController.updateTask);
app.delete('/api/tasks/:taskId', authenticationMiddleware, taskController.deleteTask);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
