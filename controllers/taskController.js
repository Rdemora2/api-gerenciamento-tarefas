const taskService = require('../services/taskService');

// Função centralizada para tratamento de erros
const handleErrors = (res, error, errorMessage) => {
  console.error(error);
  return res.status(500).json({ error: errorMessage });
};

// Controlador para criar uma nova tarefa
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await taskService.createTask(title, description, status);

    return res.status(201).json(task);
  } catch (error) {
    return handleErrors(res, error, 'Erro ao criar tarefa');
  }
};

// Controlador para listar todas as tarefas
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();

    return res.status(200).json(tasks);
  } catch (error) {
    return handleErrors(res, error, 'Erro ao listar tarefas');
  }
};

// Controlador para obter uma tarefa por ID
exports.getTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await taskService.getTaskById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    return res.status(200).json(task);
  } catch (error) {
    return handleErrors(res, error, 'Erro ao obter tarefa por ID');
  }
};

// Controlador para atualizar uma tarefa por ID
exports.updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  const { title, description, status } = req.body;
  try {
    const task = await taskService.updateTask(taskId, title, description, status);

    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    return res.status(200).json(task);
  } catch (error) {
    return handleErrors(res, error, 'Erro ao atualizar tarefa');
  }
};

// Controlador para excluir uma tarefa por ID
exports.deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const success = await taskService.deleteTask(taskId);

    if (!success) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    return res.status(204).json();
  } catch (error) {
    return handleErrors(res, error, 'Erro ao excluir tarefa');
  }
};

// Controlador para buscar tarefas por status
exports.getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const tasks = await taskService.getTasksByStatus(status);

    return res.status(200).json(tasks);
  } catch (error) {
    return handleErrors(res, error, 'Erro ao buscar tarefas por status');
  }
};
