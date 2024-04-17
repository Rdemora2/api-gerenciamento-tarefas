const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('pendente', 'em andamento', 'concluída'),
    defaultValue: 'pendente',
  },
});

Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;