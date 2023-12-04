const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const MessageHistory = require("./MessageHistory");

const Users = sequelize.define('Users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
});

Users.hasMany(MessageHistory, { as: 'sentMessages', foreignKey: 'sender_id' });
Users.hasMany(MessageHistory, { as: 'receivedMessages', foreignKey: 'recipient_id' });

module.exports = Users;
