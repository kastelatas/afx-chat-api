const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const MessageHistory = require("./MessageHistory");

const User = sequelize.define('User', {
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

User.hasMany(MessageHistory, { foreignKey: 'sender_id', as: 'sentMessages' });
User.hasMany(MessageHistory, { foreignKey: 'recipient_id', as: 'receivedMessages' });

MessageHistory.belongsTo(User, { as: 'sender', foreignKey: 'sender_id' });
MessageHistory.belongsTo(User, { as: 'recipient', foreignKey: 'recipient_id' });

module.exports = User;