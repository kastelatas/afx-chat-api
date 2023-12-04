const MessageHistory = require("../../models/MessageHistory");

const handleMessage = async (ws, data) => {
  let payload = data.payload;
  console.log("Custom event received:", payload);
  try {
    const messageHistory = await MessageHistory.findAll({
      where: {
        sender_id: payload.sender_id,
        recipient_id: payload.recipient_id,
      },
    });

    const resp = {
      type: "messageHistory",
      payload: {
        messageHistory
      }
    }

    ws.send(JSON.stringify(resp));

  } catch (error) {
    console.error("Error fetching message history:", error);
  }

};

module.exports = handleMessage;
