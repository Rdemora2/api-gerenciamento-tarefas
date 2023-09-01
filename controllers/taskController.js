const Task = require('../models/task');

// Controlador para criar uma nova tarefa
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({ title, description, status });

    return res.status(201).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

// Controlador para listar todas as tarefas
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar tarefas' });
  }
};

// Controlador para obter uma tarefa por ID
exports.getTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao obter tarefa por ID' });
  }
};

// Controlador para atualizar uma tarefa por ID
exports.updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  const { title, description, status } = req.body;
  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    task.title = title;
    task.description = description;
    task.status = status;

    await task.save();

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

// Controlador para excluir uma tarefa por ID
exports.deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    await task.destroy();

    return res.status(204).json();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao excluir tarefa' });
  }
};
