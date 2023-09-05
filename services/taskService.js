const Task = require('../models/task');

// Função para criar uma nova tarefa
const createTask = async (title, description, status) => {
  try {
    const task = await Task.create({ title, description, status });
    return task;
  } catch (error) {
    throw new Error('Erro ao criar tarefa');
  }
};

// Função para listar todas as tarefas
const getAllTasks = async () => {
  try {
    const tasks = await Task.findAll();
    return tasks;
  } catch (error) {
    throw new Error('Erro ao listar tarefas');
  }
};

// Função para obter uma tarefa por ID
const getTaskById = async (taskId) => {
  try {
    const task = await Task.findByPk(taskId);
    return task;
  } catch (error) {
    throw new Error('Erro ao obter tarefa por ID');
  }
};

// Função para atualizar uma tarefa por ID
const updateTask = async (taskId, title, description, status) => {
  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return null;
    }

    task.title = title;
    task.description = description;
    task.status = status;

    await task.save();

    return task;
  } catch (error) {
    throw new Error('Erro ao atualizar tarefa');
  }
};

// Função para excluir uma tarefa por ID
const deleteTask = async (taskId) => {
  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return null;
    }

    await task.destroy();
    return true;
  } catch (error) {
    throw new Error('Erro ao excluir tarefa');
  }
};

// Função para buscar tarefas por status
const getTasksByStatus = async (status) => {
  try {
    const tasks = await Task.findAll({
      where: { status },
    });
    return tasks;
  } catch (error) {
    throw new Error('Erro ao buscar tarefas por status');
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByStatus,
};
