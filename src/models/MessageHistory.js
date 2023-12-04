const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const MessageHistory = sequelize.define('MessageHistory', {
  message_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

});

module.exports = MessageHistory;
