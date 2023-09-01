const express = require('express');
const app = express();

const taskController = require('./controllers/taskController');

app.post('/api/tasks', taskController.createTask);
app.get('/api/tasks', taskController.getAllTasks);
app.get('/api/tasks/:taskId', taskController.getTaskById);
app.put('/api/tasks/:taskId', taskController.updateTask);
app.delete('/api/tasks/:taskId', taskController.deleteTask);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
