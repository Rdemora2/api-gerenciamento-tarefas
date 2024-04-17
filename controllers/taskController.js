const taskService = require('../services/taskService');

const handleErrors = (res, error, errorMessage) => {
  console.error(error);
  return res.status(500).json({ error: errorMessage });
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!req.userId) {
      return res.status(403).json({ error: 'Usuário não autenticado' });
    }

    const task = await taskService.createTask(title, description, status, req.userId);

    return res.status(201).json(task);
  } catch (error) {
    return handleErrors(res, error, 'Erro ao criar tarefa');
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const userId = req.userId;

    const tasks = await taskService.getAllTasks(userId);

    return res.status(200).json(tasks);
  } catch (error) {
    return handleErrors(res, error, 'Erro ao listar tarefas');
  }
};


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

exports.getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const tasks = await taskService.getTasksByStatus(status);

    return res.status(200).json(tasks);
  } catch (error) {
    return handleErrors(res, error, 'Erro ao buscar tarefas por status');
  }
};
