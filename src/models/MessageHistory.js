const sequelize = require("../../db");
const { DataTypes } = require("sequelize");

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
  /*   seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }, */

});

module.exports = MessageHistory;
