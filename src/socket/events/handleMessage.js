const MessageHistory = require("../../models/MessageHistory");

const handleMessage = async (ws, data) => {
  const messageHistory = await MessageHistory.findAll()

  ws.send(`Response to a custom event "${data.payload.message}"`);
};

module.exports = handleMessage;
