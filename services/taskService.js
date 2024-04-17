const Task = require('../models/task');

const createTask = async (title, description, status, userId) => {
  try {
    const task = await Task.create({ title, description, status, userId });
    return task;
  } catch (error) {
    throw new Error('Erro ao criar tarefa');
  }
};

const getAllTasks = async (userId) => {
  try {
    let tasks;

    if (userId) {
      tasks = await Task.findAll({
        where: { userId: userId },
      });
    } else {
      tasks = await Task.findAll();
    }

    return tasks;
  } catch (error) {
    throw new Error('Erro ao listar tarefas');
  }
};

const getTaskById = async (taskId) => {
  try {
    const task = await Task.findByPk(taskId);
    return task;
  } catch (error) {
    throw new Error('Erro ao obter tarefa por ID');
  }
};

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
