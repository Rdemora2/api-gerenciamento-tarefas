const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_manager', 'rdemora2', 'rdemora2', {
  host: 'postgres',
  dialect: 'postgres',
});

module.exports = sequelize;
