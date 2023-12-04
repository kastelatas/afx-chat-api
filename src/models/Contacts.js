const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const Contacts = sequelize.define('Contacts', {
  contact_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Название модели пользователей
      key: 'user_id', // Поле, на которое ссылаются
    },
  },
  contact_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Название модели пользователей
      key: 'user_id', // Поле, на которое ссылаются
    },
  },
});

module.exports = Contacts;
