const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('postgres://rdemora2:rdemora2@localhost:5432/task_manager', {
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
