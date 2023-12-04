const MessageHistory = require("../../models/MessageHistory");

const handleMessageSent = async (ws, data) => {
  let payload = data.payload;

  try {
    await MessageHistory.create({
      sender_id: payload.sender_id,
      recipient_id: payload.recipient_id,
      content: payload.content
    })
    console.log('Сообщение успешно сохранено:');

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
    console.error('Ошибка при сохранении сообщения:', error);
  }
};

module.exports = handleMessageSent;
